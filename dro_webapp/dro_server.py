import os
from flask import Flask, request, send_from_directory
from flask_socketio import SocketIO

print('starting...')

host = '127.0.0.1'
port = 8081

app = Flask(__name__, static_folder='./static/dist/')
#app.config['DEBUG'] = True
#app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('connect')
def handle_connect():
    print('connected')

@socketio.on('my event', namespace='/dro')
def handle_message(json):
    print('received stuff')
    print('received message: ' + json)

#@app.route('/')
#def indexHtml():
#    return app.send_static_file('index.html')

#@app.route('/')
#def indexHtml():
#    return app.send_static_file('index.html')

#@app.route('/<path:filename>')
#def staticPath(filename):
#    return app.send_static_file(filename)

print("host: {} port: {}".format(host, port))

if __name__ == '__main__':
    socketio.run(app, host, port)

print('b')
