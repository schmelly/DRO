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
import * as selectors from './selectors';

export const REINITIALIZE_POINTS = 'REINITIALIZE_POINTS';
export const LOAD_POINTS = 'LOAD_POINTS';
export const DELETE_POINTS = 'DELETE_POINTS';

@Injectable()
export class PointsActions {
  
  constructor(private ngRedux: NgRedux<IAppState>) {}

  loadPointsClick(filelist:FileList) {

    var ngRedux = this.ngRedux;
    var fileReader:FileReader = new FileReader();
    var points:Array<IPoint> = [];
    fileReader.onloadend = function(e){
      var json = JSON.parse(fileReader.result);
      points = points.concat(Object.assign([],json));
      ngRedux.dispatch({type: LOAD_POINTS, points: points});
    }

    for (var i = 0; i < filelist.length; i++) {
      var file = filelist[i];
      fileReader.readAsText(file);
    }
  }

  deletePointsClick() {
    this.ngRedux.dispatch({type: DELETE_POINTS});
  }

  emitPoints(points:Array<IPoint>) {
    this.ngRedux.dispatch({type: LOAD_POINTS, points: points});
  }
}
