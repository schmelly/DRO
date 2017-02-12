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
import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../reducers/app.reducers';
import {IPoint} from '../reducers/points.reducers';
import {INITIAL_POCKET_STATE} from '../reducers/pocket.reducers';
import * as selectors from './selectors';

export const REINITIALIZE_POCKET = 'REINITIALIZE_POCKET';
export const SET_POINTS = 'SET_POINTS';
export const SET_FINISHING_MODE = 'SET_FINISHING_MODE';

@Injectable()
export class PocketActions {
  
  constructor(private ngRedux: NgRedux<IAppState>) {}

  p1Select(idx) {
    this.ngRedux.dispatch({type: SET_POINTS, p1: this.ngRedux.getState().points.points[idx], p2: this.ngRedux.getState().pocket.pocket.p2});
  }

  p2Select(idx) {
    this.ngRedux.dispatch({type: SET_POINTS, p1: this.ngRedux.getState().pocket.pocket.p1, p2: this.ngRedux.getState().points.points[idx]});
  }

  radioSelect(value) {
    if(value=="roughing") {
      this.ngRedux.dispatch({type: SET_FINISHING_MODE, roughing: true});
    } else {
      this.ngRedux.dispatch({type: SET_FINISHING_MODE, roughing: false});
    }
  }
}
