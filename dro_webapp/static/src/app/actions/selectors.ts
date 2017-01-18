import {IAppState} from '../reducers/app.reducers';
import {ICalculator, op} from '../reducers/calculator.reducers';

export function selectBuffer(state:IAppState):number {
  return state.calculator.calculator.buffer;
}

export function selectCalculator(state:IAppState):ICalculator {
  return state.calculator.calculator;
}

export function selectDirection(state:IAppState):string {
  return state.calculator.calculator.direction;
}

export function selectDisplayString(state:IAppState):string {
  return state.calculator.calculator.displayString;
}

export function selectDisplayValue(state:IAppState):number {
  return state.calculator.calculator.displayValue;
}

export function selectOp(state:IAppState):op {
  return state.calculator.calculator.op;
}