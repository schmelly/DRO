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
import { IConfiguration } from '../reducers/configuration.reducers';
import { ConfigurationActions } from '../actions/configuration.actions';

@Component({
  selector: 'app-configuration',
  providers: [ConfigurationActions],
  template: `
  <app-configuration-view [configuration]="configuration$ | async"
    (invertAxisSelectionClick)="invertAxisSelectionClick($event);">
  </app-configuration-view>
  `
})
export class ConfigurationComponent {

  @select(['configuration', 'configuration']) configuration$: Observable<IConfiguration>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private configurationActions: ConfigurationActions
  ) { }

  invertAxisSelectionClick(event): void {
    this.configurationActions.invertAxisSelectionClick(event.axis);
  }
}
