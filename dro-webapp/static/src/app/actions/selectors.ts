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
import { IAppState } from '../reducers/app.reducers';
import { ICalculator, Op } from '../reducers/calculator.reducers';

export function selectBuffer(state: IAppState): number {
  return state.calculator.calculator.buffer;
}

export function selectCalculator(state: IAppState): ICalculator {
  return state.calculator.calculator;
}

export function selectDirection(state: IAppState): string {
  return state.calculator.calculator.direction;
}

export function selectDisplayString(state: IAppState): string {
  return state.calculator.calculator.displayString;
}

export function selectDisplayValue(state: IAppState): number {
  return state.calculator.calculator.displayValue;
}

export function selectOp(state: IAppState): Op {
  return state.calculator.calculator.op;
}

export function selectInverted(state: IAppState, axis: string): boolean {
  switch (axis) {
    case 'yAxis':
      return state.configuration.configuration.invertY;
    case 'zAxis':
      return state.configuration.configuration.invertZ;
    default:
      return state.configuration.configuration.invertX;
  }
}
