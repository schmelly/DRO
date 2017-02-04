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
import {applyMiddleware, compose, createStore, Middleware, Store} from 'redux';
import {NgRedux, select} from 'ng2-redux';
import {Observable} from 'rxjs';

import {CalculatorActions} from './actions/calculator.actions';
import {IAppState, INITIAL_APP_STATE, rootReducer} from './reducers/app.reducers';
import {ICalculator} from './reducers/calculator.reducers';
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
  providers: [CalculatorActions, SocketActions],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  @select(['calculator', 'calculator']) calculator$: Observable<ICalculator>;
  
  constructor(private ngRedux: NgRedux<IAppState>, private calcActions: CalculatorActions, private socketActions: SocketActions, private socketService:SocketService) {
    this.socketService.get(socketActions);
  }
  
  ngOnInit(): void {

    svg4everybody({
      polyfill: true
    });

    this.ngRedux.provideStore(store);
  }

  clearClick(event): void {
    this.calcActions.clearClick(event.button);
  }

  decimalClick(event): void {
    this.calcActions.decimalClick(event.button);
  }

  directionClick(event): void {
    this.calcActions.directionClick(event.button);
  }

  evalClick(event): void {
    this.calcActions.evalClick(event.button);
  }

  functionClick(event): void {
    this.calcActions.functionClick(event.button);
  }

  negateClick(event): void {
    this.calcActions.negateClick(event.button);
  }

  numericClick(event): void {
    this.calcActions.numericClick(event.button);
  }

  storeClick(event): void {
    this.calcActions.storeClick(event.button);
  }
}
