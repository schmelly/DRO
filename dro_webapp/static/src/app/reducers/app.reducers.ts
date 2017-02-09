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
import {configurationReducer, IConfigurationState, INITIAL_CONFIGURATION_STATE} from './configuration.reducers';
import {contourReducer, IContourState, INITIAL_CONTOUR_STATE} from './contour.reducers';
import {holesReducer, IHolesState, INITIAL_HOLES_STATE} from './holes.reducers';
import {midpointReducer, IMidpointState, INITIAL_MIDPOINT_STATE} from './midpoint.reducers';
import {pointsReducer, IPointsState, INITIAL_POINTS_STATE} from './points.reducers';

export interface IAppState {
  axes: IAxesState;
  calculator: ICalculatorState;
  configuration: IConfigurationState;
  contour: IContourState;
  holes: IHolesState;
  midpoint: IMidpointState;
  points: IPointsState;
};

export const INITIAL_APP_STATE:IAppState = {
  axes: INITIAL_AXES_STATE,
  calculator: INITIAL_CALCULATOR_STATE,
  configuration: INITIAL_CONFIGURATION_STATE,
  contour: INITIAL_CONTOUR_STATE,
  holes: INITIAL_HOLES_STATE,
  midpoint: INITIAL_MIDPOINT_STATE,
  points: INITIAL_POINTS_STATE
};

interface axesReducer {
    (s: IAxesState, action): IAxesState;
}

export const rootReducer = combineReducers<IAppState>({
  axes: axesReducer,
  calculator: calculatorReducer,
  configuration: configurationReducer,
  contour: contourReducer,
  holes: holesReducer,
  midpoint: midpointReducer,
  points: pointsReducer
});
