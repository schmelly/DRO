import {Component, OnInit} from '@angular/core';
import {applyMiddleware, compose, createStore, Middleware, Store} from 'redux';
import {NgRedux, select} from 'ng2-redux';
import {Observable} from 'rxjs';

import {CalculatorActions} from './actions/calculator.actions';
import {IAppState, INITIAL_APP_STATE, rootReducer} from './reducers/app.reducers';
import {ICalculator} from './reducers/calculator.reducers';
//import {SocketService} from './shared/socket.service';

const svg4everybody = require('svg4everybody');
const createLogger = require('redux-logger');

const store: Store<IAppState> = createStore(
  rootReducer,
  INITIAL_APP_STATE,
  compose(applyMiddleware(createLogger())));

@Component({
  selector: 'app',
  providers: [CalculatorActions],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  
  //private socketService: SocketService;

  @select(['calculator', 'calculator']) calculator$: Observable<ICalculator>;
  
  constructor(private ngRedux: NgRedux<IAppState>, private actions: CalculatorActions) {}
  
  ngOnInit(): void {

    svg4everybody({
      polyfill: true
    });

    this.ngRedux.provideStore(store);
  }

  clearClick(event): void {
    this.actions.clearClick(event.button);
  }

  decimalClick(event): void {
    this.actions.decimalClick(event.button);
  }

  directionClick(event): void {
    this.actions.directionClick(event.button);
  }

  evalClick(event): void {
    this.actions.evalClick(event.button);
  }

  functionClick(event): void {
    this.actions.functionClick(event.button);
  }

  negateClick(event): void {
    this.actions.negateClick(event.button);
  }

  numericClick(event): void {
    this.actions.numericClick(event.button);
  }

  storeClick(event): void {
    this.actions.storeClick(event.button);
  }
}
