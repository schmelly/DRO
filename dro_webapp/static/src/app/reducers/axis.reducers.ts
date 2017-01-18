import * as axes_actions from '../actions/axis.actions';
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
    reference: 'abs'
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
    state[axis.name].absValue = 0;
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

export function axesReducer(state:IAxesState = INITIAL_AXES_STATE, action): IAxesState {

  var stateCopy = {...state};
  switch(action.type) {
    case axes_actions.CHANGE_UNIT: return setUnit(stateCopy, action.axis, action.unit);
    case axes_actions.CHANGE_REFERENCE: return setReference(stateCopy, action.axis, action.reference);
    case axes_actions.SET_ZERO: return setZero(stateCopy, action.axis, action.abs, action.inc, action.incValue);
    case axes_actions.SET_AXIS: return setAxis(stateCopy, action.axis, action.incValue);
  }
  return state;
};
