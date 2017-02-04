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
import {combineReducers} from 'redux';

import {axesReducer, IAxesState, INITIAL_AXES_STATE} from './axis.reducers';
import {calculatorReducer, ICalculatorState, INITIAL_CALCULATOR_STATE} from './calculator.reducers';

export interface IAppState {
  axes: IAxesState;
  calculator: ICalculatorState;
};

export const INITIAL_APP_STATE:IAppState = {
  axes: INITIAL_AXES_STATE,
  calculator: INITIAL_CALCULATOR_STATE
};

interface axesReducer {
    (s: IAxesState, action): IAxesState;
}

export const rootReducer = combineReducers<IAppState>({
  axes: axesReducer,
  calculator: calculatorReducer
});
