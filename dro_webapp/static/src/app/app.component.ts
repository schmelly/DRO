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
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {applyMiddleware, compose, createStore, Middleware, Store} from 'redux';
import {NgRedux} from 'ng2-redux';

import {IAppState, INITIAL_APP_STATE, rootReducer} from './reducers/app.reducers';
import {SocketActions} from './actions/socket.actions';
import {SocketService} from './shared/socket.service';

const svg4everybody = require('svg4everybody');
const createLogger = require('redux-logger');

const store: Store<IAppState> = createStore(
  rootReducer,
  INITIAL_APP_STATE/*,
  compose(applyMiddleware(createLogger()))*/);

@Component({
  selector: 'app',
  providers: [ SocketActions],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private socketActions: SocketActions, 
    private socketService:SocketService,
    private router:Router) {
    this.socketService.get(socketActions);
  }
  
  ngOnInit(): void {

    svg4everybody({
      polyfill: true
    });

    this.ngRedux.provideStore(store);
  }
}
