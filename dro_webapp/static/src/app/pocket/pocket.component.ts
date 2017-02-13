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
import {IPocket} from '../reducers/pocket.reducers';
import {IPoint} from '../reducers/points.reducers';
import {IAxis} from '../reducers/axis.reducers';
import {PocketActions} from '../actions/pocket.actions';
import {INITIAL_POCKET_STATE} from '../reducers/pocket.reducers';

@Component({
  selector: 'pocket',
  providers: [PocketActions],
  template: `
  <pocketView
    [pocket]="pocket$ | async"
    [points]="points$ | async"
    [xAxis]="xAxis$ | async"
    [yAxis]="yAxis$ | async"
    [zAxis]="zAxis$ | async"
    (p1Select)="p1Select($event);"
    (p2Select)="p2Select($event);"
    (radioSelect)="radioSelect($event);">
  >
  </pocketView>
  `
})
export class PocketComponent {

  @select(['pocket', 'pocket']) pocket$: Observable<IPocket>;
  @select(['points', 'points']) points$: Observable<Array<IPoint>>;
  @select(['axes', 'xAxis']) xAxis$: Observable<IAxis>;
  @select(['axes', 'yAxis']) yAxis$: Observable<IAxis>;
  @select(['axes', 'zAxis']) zAxis$: Observable<IAxis>;
  
  constructor(
    private ngRedux: NgRedux<IAppState>, 
    private pocketActions: PocketActions
  ) {}

  p1Select(event): void {
    console.log(event);
    this.pocketActions.p1Select(event);
  }

  p2Select(event): void {
    this.pocketActions.p2Select(event);
  }

  radioSelect(event): void {
    this.pocketActions.radioSelect(event);
  }
}
