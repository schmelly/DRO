/*
    DRO WebApp

    Copyright (C) 2017 David Schmelter

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see
    <https://github.com/schmelly/DRO/tree/master/dro-webapp> or
    <http://www.gnu.org/licenses/>.
*/
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import io from 'socket.io-client';

import { IAppState } from '../reducers/app.reducers';
import { IAxis } from '../reducers/axis.reducers';
import { SocketActions } from '../actions/socket.actions';
import { REINITIALIZE_AXES } from '../actions/axis.actions';
import { REINITIALIZE_CALCULATOR } from '../actions/calculator.actions';
import { REINITIALIZE_CONFIGURATION } from '../actions/configuration.actions';

@Injectable()
export class SocketService {
    private name: string;
    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
    private socket: io.Socket;
    private connected = false;
    private socketActions: SocketActions;

    constructor(private ngRedux: NgRedux<IAppState>) { }

    get(actions: SocketActions) {
        const socketUrl = this.host;
        this.socketActions = actions;
        this.socket = io.connect(socketUrl, { transports: ['websocket'] });
        this.socket.on('connect', () => this.connected = true);
        this.socket.on('disconnect', () => this.connected = false);
        this.socket.on('error', (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });
        this.socket.on('absPos', (data) => { actions.absPosition({ data }); });
        this.socket.on('loadConfiguration', (data) => {
            const axesConfig = data['axes'];
            const calculatorConfig = data['calculator'];
            const configurationConfig = data['configuration'];
            this.ngRedux.dispatch({ type: REINITIALIZE_AXES, axes: axesConfig });
            this.ngRedux.dispatch({ type: REINITIALIZE_CALCULATOR, calculator: calculatorConfig });
            this.ngRedux.dispatch({ type: REINITIALIZE_CONFIGURATION, configuration: configurationConfig });
        });
        return this;
    }

    setZero(axisLabel: string) {
        this.socket.emit('setZero', { axis: axisLabel });
    }

    setAbsPostion(axisLabel: string, absPos: number) {

        if (axisLabel === this.ngRedux.getState().axes.xAxis.label && this.ngRedux.getState().configuration.configuration.invertX) {
            absPos = -absPos;
        } else if (axisLabel === this.ngRedux.getState().axes.yAxis.label && this.ngRedux.getState().configuration.configuration.invertY) {
            absPos = -absPos;
        } else if (axisLabel === this.ngRedux.getState().axes.zAxis.label && this.ngRedux.getState().configuration.configuration.invertZ) {
            absPos = -absPos;
        }

        if (this.connected) {
            this.socket.emit('setAbsPosition', { axis: axisLabel, absPos: absPos });
        } else {
            const curAbsPos = {
                data: {
                    'X': this.ngRedux.getState().axes.xAxis.absValue,
                    'Y': this.ngRedux.getState().axes.yAxis.absValue,
                    'Z': this.ngRedux.getState().axes.zAxis.absValue,
                    'magX': 0,
                    'magY': 0,
                    'magZ': 0
                }
            };
            curAbsPos.data[axisLabel] = absPos;
            this.socketActions.absPosition(curAbsPos);
        }
    }

    saveConfiguration(appState: IAppState) {
        if (this.connected) {
            this.socket.emit('saveConfiguration', appState);
        }
    }

    loadConfiguration() {
        if (this.connected) {
            this.socket.emit('loadConfiguration');
        }
    }

    shutdown() {
        if (this.connected) {
            this.socket.emit('shutdown');
        }
    }

    reboot() {
        if (this.connected) {
            this.socket.emit('reboot');
        }
    }
}
