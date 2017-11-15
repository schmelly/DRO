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
import { Action, Dispatch } from 'redux';

import { IAppState } from '../reducers/app.reducers';
import { ICalculator } from '../reducers/calculator.reducers';
import * as selectors from './selectors';

export const REINITIALIZE_CALCULATOR = 'REINITIALIZE_CALCULATOR';
export const CALCULATOR = 'CALCULATOR';
export const DIRECTION = 'DIRECTION';
export const DISPLAY_STRING = 'DISPLAY_STRING';

export const NUMBER_FORMAT = new Intl.NumberFormat(
  'en',
  {
    style: 'decimal',
    maximumFractionDigits: 4,
    useGrouping: false
  });

@Injectable()
export class CalculatorActions {

  constructor(private ngRedux: NgRedux<IAppState>) { }

  evaluate(calc: ICalculator) {
    calc.displayValue = Number(calc.displayString);
    calc.displayString = NUMBER_FORMAT.format(calc.displayValue);

    if (calc.op !== undefined) {
      calc.displayValue = calc.op(calc.buffer, calc.displayValue);
      calc.buffer = undefined;
      calc.op = undefined;
      calc.displayString = NUMBER_FORMAT.format(calc.displayValue);
    }
  }

  clearClick(button: string) {

    const calc: ICalculator = { ...selectors.selectCalculator(this.ngRedux.getState()) };
    this.evaluate(calc);

    switch (button) {
      case 'CE':
        calc.buffer = undefined;
        calc.displayString = '0';
        calc.displayValue = undefined;
        calc.memoryValue = undefined;
        calc.op = undefined;
        break;
      case 'C':
        calc.displayString = '0';
        calc.displayValue = 0;
        break;
      case 'del':
        if (calc.displayString.length > 0) {
          calc.displayString = calc.displayString.substring(0, calc.displayString.length - 1);
        }
        if (calc.displayString.length === 0 || calc.displayString === '-') {
          calc.displayString = '0';
        }
        break;
    }

    this.ngRedux.dispatch({ type: CALCULATOR, calculator: calc });
  }

  decimalClick(button: string) {
    let displayString = selectors.selectDisplayString(this.ngRedux.getState());
    if (displayString.indexOf('.') >= 0 || displayString.length === 0) {
      return;
    }
    displayString = displayString + button;
    this.ngRedux.dispatch({ type: DISPLAY_STRING, displayString: displayString });
  }

  directionClick(button: string) {
    const dir = selectors.selectDirection(this.ngRedux.getState());
    switch (dir) {
      case 'left':
        this.ngRedux.dispatch({ type: DIRECTION, direction: 'right' });
        break;
      default:
        this.ngRedux.dispatch({ type: DIRECTION, direction: 'left' });
        break;
    }
  }

  evalClick(button: string) {

    const calc: ICalculator = { ...selectors.selectCalculator(this.ngRedux.getState()) };
    this.evaluate(calc);

    this.ngRedux.dispatch({ type: CALCULATOR, calculator: calc });
  }

  functionClick(button: string) {

    const calc: ICalculator = { ...selectors.selectCalculator(this.ngRedux.getState()) };

    this.evaluate(calc);
    calc.buffer = calc.displayValue;

    switch (button) {
      case '/':
        calc.op = (a: number, b: number) => a / b;
        calc.displayString = '0';
        calc.displayValue = 0;
        break;
      case '+':
        calc.op = (a: number, b: number) => a + b;
        calc.displayString = '0';
        calc.displayValue = 0;
        break;
      case '-':
        calc.op = (a: number, b: number) => a - b;
        calc.displayString = '0';
        calc.displayValue = 0;
        break;
      case '*':
        calc.op = (a: number, b: number) => a * b;
        calc.displayString = '0';
        calc.displayValue = 0;
        break;
      case 'sin':
        calc.op = (a: number, b: number) => Math.sin(a);
        this.evaluate(calc);
        break;
      case 'cos':
        calc.op = (a: number, b: number) => Math.cos(a);
        this.evaluate(calc);
        break;
      case 'tan':
        calc.op = (a: number, b: number) => Math.tan(a);
        this.evaluate(calc);
        break;
      case 'sqrt':
        calc.op = (a: number, b: number) => Math.sqrt(a);
        this.evaluate(calc);
        break;
    }

    this.ngRedux.dispatch({ type: CALCULATOR, calculator: calc });
  }

  negateClick(button: string) {

    let displayString = selectors.selectDisplayString(this.ngRedux.getState());
    if (displayString.startsWith('-')) {
      displayString = displayString.substring(1);
    } else {
      displayString = '-' + displayString;
    }

    this.ngRedux.dispatch({ type: DISPLAY_STRING, displayString: displayString });
  }

  numericClick(button: string) {
    let displayString = selectors.selectDisplayString(this.ngRedux.getState());
    displayString = displayString + button;

    if (displayString.startsWith('0') && displayString.length > 1) {
      displayString = displayString.substring(1);
    }
    this.ngRedux.dispatch({ type: DISPLAY_STRING, displayString: displayString });
  }

  storeClick(button: string) {
  }
}
