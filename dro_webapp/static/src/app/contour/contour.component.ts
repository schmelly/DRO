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
import {Component} from '@angular/core';
import {NgRedux, select} from 'ng2-redux';
import {Observable} from 'rxjs';

import {IAppState} from '../reducers/app.reducers';
import {IContour} from '../reducers/contour.reducers';
import {IPoint} from '../reducers/points.reducers';
import {ContourActions} from '../actions/contour.actions';

@Component({
  selector: 'contour',
  providers: [ContourActions],
  template: `
  <contourView
    [contour]="contour$ | async"
    [points]="points$ | async"
    [xAxis]="xAxis$ | async"
    [yAxis]="yAxis$ | async"
    [zAxis]="zAxis$ | async"
  >
  </contourView>
  `
})
export class ContourComponent {

  @select(['contour', 'contour']) contour$: Observable<IContour>;
  @select(['points', 'points']) points$: Observable<Array<IPoint>>;
  @select(['axes', 'xAxis']) xAxis$: Observable<IContour>;
  @select(['axes', 'yAxis']) yAxis$: Observable<IContour>;
  @select(['axes', 'zAxis']) zAxis$: Observable<IContour>;
  
  constructor(
    private ngRedux: NgRedux<IAppState>, 
    private contourActions: ContourActions
  ) {}

  invertAxisSelectionClick(event): void {
  }
}
