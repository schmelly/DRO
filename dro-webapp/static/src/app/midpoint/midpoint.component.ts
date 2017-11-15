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
import { IMidpoint } from '../reducers/midpoint.reducers';
import { MidpointActions } from '../actions/midpoint.actions';

@Component({
  selector: 'app-midpoint',
  providers: [MidpointActions],
  template: `
  <app-midpoint-view [midpoint]="midpoint$ | async">
  </app-midpoint-view>
  `
})
export class MidpointComponent {

  @select(['midpoint', 'midpoint']) midpoint$: Observable<IMidpoint>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private midpointActions: MidpointActions
  ) { }

  invertAxisSelectionClick(event): void {
  }
}
