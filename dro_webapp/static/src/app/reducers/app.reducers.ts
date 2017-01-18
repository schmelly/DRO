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
