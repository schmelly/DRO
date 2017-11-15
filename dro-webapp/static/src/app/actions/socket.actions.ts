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
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../reducers/app.reducers';

export const ABS_POS = 'ABS_POS';

@Injectable()
export class SocketActions {

  constructor(private ngRedux: NgRedux<IAppState>) { }

  absPosition(absPosition) {
    if (this.ngRedux.getState().configuration.configuration.invertX) {
      absPosition.data.X = -absPosition.data.X;
    }
    if (this.ngRedux.getState().configuration.configuration.invertY) {
      absPosition.data.Y = -absPosition.data.Y;
    }
    if (this.ngRedux.getState().configuration.configuration.invertZ) {
      absPosition.data.Z = -absPosition.data.Z;
    }
    this.ngRedux.dispatch({ type: ABS_POS, absPosition: absPosition });
  }
}
