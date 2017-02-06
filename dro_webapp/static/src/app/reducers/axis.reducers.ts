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

import * as axes_actions from '../actions/axis.actions';
import * as socket_actions from '../actions/socket.actions';
import {IAxis} from '../axis/axis.component';

export interface IAxesState {
  xAxis: IAxis;
  yAxis: IAxis;
  zAxis: IAxis;
};

const defaultAxis:IAxis = {
    name: '',
    label: '',
    absValue: 0,
    incValue: 0,
    unit: 'mm',
    reference: 'abs',
    magIndicator: 0
};

function createAxis(name: string, label:string):IAxis {
  var axis:IAxis = {...defaultAxis, name: name, label: label};
  return axis;
};

export const INITIAL_AXES_STATE:IAxesState = {
  'xAxis': createAxis('xAxis', 'X'),
  'yAxis': createAxis('yAxis', 'Y'),
  'zAxis': createAxis('zAxis', 'Z')
};

function setUnit(state:IAxesState, axis:IAxis, unit:string): IAxesState {
  state[axis.name].unit = unit;
  return state;
}

function setReference(state:IAxesState, axis:IAxis, reference:string): IAxesState {
  state[axis.name].reference = reference;
  return state;
}

function setZero(state:IAxesState, axis:IAxis, abs: boolean, inc: boolean, incValue: number): IAxesState {
  if(abs!==undefined && abs===true) {
    state[axis.name].incValue = incValue;
    state[axis.name]['reference'] = 'inc';
  }
  if(inc!==undefined && inc===true) {
    state[axis.name].incValue = 0;
  }
  return state;
}

function setAxis(state:IAxesState, axis:IAxis, value: number): IAxesState {
  state[axis.name]['incValue'] = value;
  state[axis.name]['reference'] = 'inc';
  return state;
}

function setAbsPosition(state:IAxesState, absPosition): IAxesState {
  var offsetX = absPosition.data.X - state.xAxis.absValue;
  var offsetY = absPosition.data.Y - state.yAxis.absValue;
  var offsetZ = absPosition.data.Z - state.zAxis.absValue;
  state.xAxis.absValue = absPosition.data.X;
  state.yAxis.absValue = absPosition.data.Y;
  state.zAxis.absValue = absPosition.data.Z;
  state.xAxis.incValue = state.xAxis.incValue + offsetX;
  state.yAxis.incValue = state.yAxis.incValue + offsetY;
  state.zAxis.incValue = state.zAxis.incValue + offsetZ;
  state.xAxis.magIndicator = absPosition.data.magX;
  state.yAxis.magIndicator = absPosition.data.magY;
  state.zAxis.magIndicator = absPosition.data.magZ;
  return state;
}

export function axesReducer(state:IAxesState = INITIAL_AXES_STATE, action): IAxesState {

  var stateCopy = {...state};
  switch(action.type) {
    case axes_actions.REINITIALIZE_AXES: return action.axes;
    case axes_actions.CHANGE_UNIT: return setUnit(stateCopy, action.axis, action.unit);
    case axes_actions.CHANGE_REFERENCE: return setReference(stateCopy, action.axis, action.reference);
    case axes_actions.SET_ZERO: return setZero(stateCopy, action.axis, action.abs, action.inc, action.incValue);
    case axes_actions.SET_AXIS: return setAxis(stateCopy, action.axis, action.incValue);
    case socket_actions.ABS_POS: return setAbsPosition(stateCopy, action.absPosition);
  }
  return state;
};
