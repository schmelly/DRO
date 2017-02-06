#!/usr/bin/python3

#    DRO WebApp
#
#    Copyright (C) 2017 David Schmelter
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see 
#    <https://github.com/schmelly/DRO/tree/master/dro_webapp> or 
#    <http://www.gnu.org/licenses/>.

from flask import Flask, request, send_from_directory
from flask_socketio import SocketIO, emit
import os
import RPi.GPIO as GPIO
import sys
import threading
import time

print('starting...')

#helper classes
class SensorReadingThread(threading.Thread):
  def __init__(self):
    threading.Thread.__init__(self)
  def run(self):
    global appAlive
    
    #i = 0
    #target = time.time() + 1.0
    
    try:
      while appAlive:
        #i = i + 1
        updateAbsPos()
        time.sleep(0.001)
        #updateAbsPos('Y')
        #updateAbsPos('Z')
        #if time.time() >= target:
        #  print('Readings/second: {}'.format(i))
        #  target = time.time() + 1.0
        #  i = 0
    finally:
      appAlive = False
      pass

# global variables
HOST = '0.0.0.0'
PORT = 80

PIN_CSN = 11
PIN_CLK = 12
PIN_DO_X = 15
PIN_DO_Y = 16

rawPos = {'X':0,'Y':0,'Z':0}
increments = {'X':0,'Y':0,'Z':0}

filterPosSize = 8
filterPosValues = []

absPos = {'X':0.0,'Y':0.0,'Z':0.0}
absZero = {'X':0.0,'Y':0.0,'Z':0.0}

magX = 0
magY = 0
magZ = 0

connectedClients = 0

app = Flask(__name__, static_folder='./static/dist/')
socketio = SocketIO(app, async_mode="eventlet")

sensorReadingThread = SensorReadingThread()
broadcastingThread = None
appAlive = True

#functions
def setup_gpio():
  GPIO.setmode(GPIO.BOARD)

  GPIO.setup(PIN_CSN, GPIO.OUT)
  GPIO.setup(PIN_CLK, GPIO.OUT)
  GPIO.setup(PIN_DO_X, GPIO.IN)
  GPIO.setup(PIN_DO_Y, GPIO.IN)

  GPIO.output(PIN_CSN, GPIO.HIGH)
  GPIO.output(PIN_CLK, GPIO.HIGH)

def read_raw_pos():
  
  #enable serial transfer
  GPIO.output(PIN_CSN, GPIO.LOW)
  
  word_x = 0
  MagINC_x = 0
  MagDEC_x = 0
  LIN_x = 0
  pos_x = 0
  
  word_y = 0
  MagINC_y = 0
  MagDEC_y = 0
  LIN_y = 0
  pos_y = 0
  
  for i in range(0, 18):
    GPIO.output(PIN_CLK, GPIO.LOW)
    GPIO.output(PIN_CLK, GPIO.HIGH)
    
    bit_x = GPIO.input(PIN_DO_X)
    word_x = (word_x << 1) | bit_x
    
    bit_y = GPIO.input(PIN_DO_Y)
    word_y = (word_y << 1) | bit_y
    
    if i == 14:
      LIN_x = bit_x
      LIN_y = bit_y
    if i == 15:
      MagINC_x = bit_x
      MagINC_y = bit_y
    if i == 14:
      MagDEC_x = bit_x
      MagDEC_y = bit_y
    if i == 11:
      pos_x = word_x
      pos_y = word_y
  
  #disable serial transfer
  GPIO.output(PIN_CSN, GPIO.HIGH)
  
  mag_x = (MagINC_x << 2) | (MagDEC_x << 1) | LIN_x
  mag_y = (MagINC_y << 2) | (MagDEC_y << 1) | LIN_y
  
  return {'X':pos_x, 'xMag':mag_x,'Y':pos_y, 'yMag':mag_y}

# def read_mag(axis):
  
  # #clk low to enable reading mag info
  # GPIO.output(PIN_CLK, GPIO.LOW)
  
  # #enable serial transfer
  # GPIO.output(PIN_CSN, GPIO.LOW)
  
  # word = ""
  # MagINC = 0
  # MagDEC = 0
  # LIN = 0
  # mag = 0
  
  # for i in range(0, 18):
    # GPIO.output(PIN_CLK, GPIO.LOW)
    # GPIO.output(PIN_CLK, GPIO.HIGH)
    # bit = GPIO.input(PIN_DO)
    # word = word + str(bit)
    # if i == 14:
      # LIN = bit
    # if i == 15:
      # MagINC = bit
    # if i == 14:
      # MagDEC = bit
    # if i == 11:
      # mag = int(word,2)
  
  # #disable serial transfer
  # GPIO.output(PIN_CSN, GPIO.HIGH)
  
  # return mag;

def read_abs_pos():
  
  global rawPos
  global increments
  
  absPosition = {'X':0.0, 'Y':0.0, 'Z':0.0}
  newRawPos = read_raw_pos()
  
  if (newRawPos['X'] >= 2048 and rawPos['X'] < 2048 and abs(newRawPos['X']-rawPos['X'])>=2048):
    increments['X'] = increments['X'] - 1.0
  elif (newRawPos['X'] < 2048 and rawPos['X'] >= 2048 and abs(newRawPos['X']-rawPos['X'])>=2048):
    increments['X'] = increments['X'] + 1.0
  absPosition['X'] = newRawPos['X']*2.0/4096.0 + 2.0*increments['X']
  
  if (newRawPos['Y'] >= 2048 and rawPos['Y'] < 2048 and abs(newRawPos['Y']-rawPos['Y'])>=2048):
    increments['Y'] = increments['Y'] - 1.0
  elif (newRawPos['Y'] < 2048 and rawPos['Y'] >= 2048 and abs(newRawPos['Y']-rawPos['Y'])>=2048):
    increments['Y'] = increments['Y'] + 1.0
  absPosition['Y'] = newRawPos['Y']*2.0/4096.0 + 2.0*increments['Y']
  
  rawPos['X'] = newRawPos['X']
  rawPos['Y'] = newRawPos['Y']
  
  return {'X':absPosition['X'], 'xMag':newRawPos['xMag'],'Y':absPosition['Y'], 'yMag':newRawPos['yMag']}

def updateAbsPos():

  global absPos
  global filterPosValues
  global filterPosSize
  global magX
  global magY
  
  absPosition = read_abs_pos()
  posX = absPosition['X']
  magX = absPosition['xMag']
  posY = absPosition['Y']
  magY = absPosition['yMag']
  posZ = 0.0
  magZ = 0
  
  filterPosValues.pop(0)
  filterPosValues.append({'X':posX,'Y':posY,'Z':posZ})
  
  sum = 0
  for i in filterPosValues:
    sum = sum + i['X'];
  absPos['X'] = sum / filterPosSize
  
  sum = 0
  for i in filterPosValues:
    sum = sum + i['Y'];
  absPos['Y'] = sum / filterPosSize
  
  sum = 0
  for i in filterPosValues:
    sum = sum + i['Z'];
  absPos['Z'] = sum / filterPosSize

def broadcastPosition():
  
  global absPos
  global connectedClients
  global appAlive
  
  try:
    while appAlive:
      socketio.sleep(0.05)
      if connectedClients > 0 and appAlive:
        socketio.emit('absPos', {'X': absPos['X']-absZero['X'], 'Y': absPos['Y']-absZero['Y'],'Z': absPos['Z']-absZero['Z'], 'magX': magX, 'magY': magY, 'magZ': magZ})
  finally:
    appAlive = False
    pass

@socketio.on('connect')
def handle_connect():
  global connectedClients
  global broadcastingThread
  connectedClients = connectedClients + 1
  
  print('connectedClients: {}'.format(connectedClients))
  
  if broadcastingThread is None:
    broadcastingThread = socketio.start_background_task(target=broadcastPosition)

@socketio.on('disconnect')
def handle_disconnect():
  global connectedClients
  connectedClients = connectedClients - 1;
  print('connectedClients: {}'.format(connectedClients))
    
@socketio.on('setZero')
def handleSetZero(json):
  global absPos
  global absZero
  axis = json['axis']
  absZero[axis] = absPos[axis]

@socketio.on('setPosition')
def handleSetPosition(json):
  global absPos
  global absZero
  axis = json['axis']
  position = json['pos']
  absZero[axis] = absPos[axis]

@socketio.on('saveConfiguration')
def handleSaveConfiguration(json):
  global rawPos
  global absPos
  global absZero
  global increments
  
  config = {
    'rawPos':rawPos,
    'absPos':absPos,
    'absZero':absZero,
    'increments':increments,
    'clientConfig':json}
  
  with open('dro_server.conf', 'w') as f:
    f.write(str(config))

@socketio.on('loadConfiguration')
def handleLoadConfiguration():
  global rawPos
  global absPos
  global absZero
  global increments
  
  with open('dro_server.conf', 'r') as f:
    config = f.read()
    config = eval(config)
    rawPos = config['rawPos']
    absPos = config['absPos']
    absZero = config['absZero']
    increments = config['increments']
    emit('loadConfiguration', config['clientConfig'])

@app.route('/')
def indexHtml():
    return app.send_static_file('index.html')

@app.route('/<path:filename>')
def staticPath(filename):
    return app.send_static_file(filename)

def main():
  
  global rawPos
  global absPos
  global filterPosValues
  global filterPosSize
  global increments
  global sensorReadingThread
  
  setup_gpio()
  
  #initialize position values
  rawPosition = read_raw_pos()
  rawPos['X'] = rawPosition['X']
  rawPos['Y'] = rawPosition['Y']
  
  magX = rawPosition['xMag']
  magY = rawPosition['yMag']
  
  absPosition = read_abs_pos()
  absPos['X'] = absPosition['X']
  absPos['Y'] = absPosition['Y']
  
  filterPosValues = [{'X':absPos['X'],'Y':absPos['Y'],'Z':0.0}]*filterPosSize
  
  sensorReadingThread.start()
  socketio.run(app, HOST, PORT)

if __name__ == '__main__':
  main()

appAlive = False
sensorReadingThread.join()
print('exiting...')
