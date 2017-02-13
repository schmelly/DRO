import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAxis} from '../reducers/axis.reducers';
import {IAppState} from "../reducers/app.reducers";
import {ICalculator} from '../reducers/calculator.reducers';
import {SocketService} from '../shared/socket.service';
import * as selectors from './selectors';

import {DISPLAY_STRING, NUMBER_FORMAT} from './calculator.actions';

export const REINITIALIZE_AXES = 'REINITIALIZE_AXES';
export const CHANGE_UNIT = 'CHANGE_UNIT';
export const CHANGE_REFERENCE = 'CHANGE_REFERENCE';
export const SET_ZERO = 'SET_ZERO';
export const SET_AXIS = 'SET_AXIS';

@Injectable()
export class AxisActions {
  constructor(private ngRedux: NgRedux<IAppState>, private socketService:SocketService) {}

  changeAxisUnit(axis:IAxis) {

    var unit:string;
    if(axis.unit==='mm') {
      unit = 'inch';
    } else {
      unit = 'mm';
    }

    this.ngRedux.dispatch({type: CHANGE_UNIT, axis, unit});
  }

  changeReference(axis:IAxis) {

    var reference:string;
      if(axis.reference==='abs') {
      reference = 'inc';
    } else if(axis.reference==='inc' && axis.pointName!==undefined){
      reference = axis.pointName;
    } else {
      reference = 'abs';
    }

    this.ngRedux.dispatch({type: CHANGE_REFERENCE, axis: axis, reference});
  }

  setZero(axis:IAxis) {

    if(axis.reference==='abs') {
      this.socketService.setZero(axis.label);
    }
    else if(axis.reference==='abs') {
      this.ngRedux.dispatch({type: SET_ZERO, axis: axis, inc: true});
    }
  }

  setAxis(axis:IAxis) {
    var calc = selectors.selectCalculator(this.ngRedux.getState());
    var displayString = selectors.selectDisplayString(this.ngRedux.getState());

    switch(calc.direction) {
      case 'left':
        if('abs'===axis.reference) {
          this.socketService.setAbsPostion(axis.label, Number(displayString));
        } else if('inc'===axis.reference) {
          this.ngRedux.dispatch({type: SET_AXIS, axis: axis, incOffset: Number(displayString)-axis.absValue});
        }
      break;
      case 'right':
        if('abs'===axis.reference) {
          displayString = NUMBER_FORMAT.format(axis.absValue);
        } else if('inc'===axis.reference) {
          displayString = NUMBER_FORMAT.format(axis.absValue+axis.incOffset);
        }
        this.ngRedux.dispatch({type: DISPLAY_STRING, displayString: displayString});
    }

    //this.ngRedux.dispatch({type: SET_AXIS, axis: axis});
  }
}
