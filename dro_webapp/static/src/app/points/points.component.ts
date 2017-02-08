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
import {IPoints} from '../reducers/points.reducers';
import {PointsActions} from '../actions/points.actions';

@Component({
  selector: 'points',
  providers: [PointsActions],
  template: `
  <pointsView [points]="points$ | async">
  </pointsView>
  `
})
export class PointsComponent {

  @select(['points', 'points']) points$: Observable<IPoints>;
  
  constructor(
    private ngRedux: NgRedux<IAppState>, 
    private pointsActions: PointsActions
  ) {}

  invertAxisSelectionClick(event): void {
  }
}