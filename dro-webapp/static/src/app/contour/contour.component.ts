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
    <https://github.com/schmelly/DRO/tree/master/dro-webapp> or
    <http://www.gnu.org/licenses/>.
*/
import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../reducers/app.reducers';
import { IContour } from '../reducers/contour.reducers';
import { IPoint } from '../reducers/points.reducers';
import { IAxis } from '../reducers/axis.reducers';
import { ContourActions } from '../actions/contour.actions';
import { INITIAL_CONTOUR_STATE } from '../reducers/contour.reducers';

@Component({
  selector: 'app-contour',
  providers: [ContourActions],
  template: `
  <app-contour-view
    [contour]="contour$ | async"
    [points]="points$ | async"
    [xAxis]="xAxis$ | async"
    [yAxis]="yAxis$ | async"
    [zAxis]="zAxis$ | async"
    (p1Select)="p1Select($event);"
    (p2Select)="p2Select($event);"
    (radioSelect)="radioSelect($event);">
  >
  </app-contour-view>
  `
})
export class ContourComponent {

  @select(['contour', 'contour']) contour$: Observable<IContour>;
  @select(['points', 'points']) points$: Observable<Array<IPoint>>;
  @select(['axes', 'xAxis']) xAxis$: Observable<IAxis>;
  @select(['axes', 'yAxis']) yAxis$: Observable<IAxis>;
  @select(['axes', 'zAxis']) zAxis$: Observable<IAxis>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private contourActions: ContourActions
  ) { }

  p1Select(event): void {
    this.contourActions.p1Select(event);
  }

  p2Select(event): void {
    this.contourActions.p2Select(event);
  }

  radioSelect(event): void {
    this.contourActions.radioSelect(event);
  }
}
