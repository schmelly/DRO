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
    <https://github.com/schmelly/DRO/tree/master/dro_webapp> or 
    <http://www.gnu.org/licenses/>.
*/
import * as io from "socket.io-client";
import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from "../reducers/app.reducers";
import {SocketActions} from "../actions/socket.actions";
import {REINITIALIZE_AXES} from "../actions/axis.actions";
import {REINITIALIZE_CALCULATOR} from "../actions/calculator.actions";
import {REINITIALIZE_CONFIGURATION} from "../actions/configuration.actions";

@Injectable()
export class SocketService {
    private name: string;
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    socket: SocketIOClient.Socket;

    constructor(private ngRedux: NgRedux<IAppState>) {}

    get(actions: SocketActions) {
        let socketUrl = this.host;
        this.socket = io.connect(socketUrl, {transports: ['websocket']});
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });
        this.socket.on("absPos", (data) => {actions.absPosition({data})});
        this.socket.on("loadConfiguration", (data) => {
            var axesConfig = data['axes'];
            var calculatorConfig = data['calculator'];
            var configurationConfig = data['configuration'];
            this.ngRedux.dispatch({type: REINITIALIZE_AXES, axes:axesConfig});
            this.ngRedux.dispatch({type: REINITIALIZE_CALCULATOR, calculator:calculatorConfig});
            this.ngRedux.dispatch({type: REINITIALIZE_CONFIGURATION, configuration:configurationConfig});
        });
        return this;
    }

    private connect() {
    }

    private disconnect() {
    }

    setZero(axisLabel:string) {
        this.socket.emit('setZero', {axis: axisLabel});
    }

    setAbsPostion(axisLabel:string, absPos:number) {
        this.socket.emit('setAbsPosition', {axis: axisLabel, absPos: absPos});
    }

    saveConfiguration(appState:IAppState) {
        this.socket.emit('saveConfiguration', appState);
    }

    loadConfiguration() {
        this.socket.emit('loadConfiguration');
    }
}
