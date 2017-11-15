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

import { ShutdownActions } from '../actions/shutdown.actions';

@Component({
  selector: 'app-shutdown',
  providers: [ShutdownActions],
  template: `
  <app-shutdown-view
    (shutdownClick)="shutdownClick($event);"
    (rebootClick)="rebootClick($event);">
  </app-shutdown-view>
  `
})
export class ShutdownComponent {

  constructor(private shutdownActions: ShutdownActions) { }

  shutdownClick(event): void {
    this.shutdownActions.shutdownClick();
  }

  rebootClick(event): void {
    this.shutdownActions.rebootClick();
  }
}
