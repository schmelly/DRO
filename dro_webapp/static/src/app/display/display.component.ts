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
import {AsyncPipe} from '@angular/common';
import {NgRedux, select} from 'ng2-redux';
import {Observable} from 'rxjs';

import {AxisActions} from '../actions/axis.actions';
import {IAppState} from '../reducers/app.reducers';
import {IAxis} from '../axis/axis.component';

@Component({
  selector: 'display',
  providers: [AxisActions],
  styleUrls: ['./display.component.css'],
  templateUrl: './display.component.html'
})
export class DisplayComponent {
  
  @select(['axes', 'xAxis']) xAxis$: Observable<IAxis>;
  @select(['axes', 'yAxis']) yAxis$: Observable<IAxis>;
  @select(['axes', 'zAxis']) zAxis$: Observable<IAxis>;
  
  constructor(private actions: AxisActions) {}
  
  unitSelection(event): void {
    this.actions.changeAxisUnit(event.axis);
  }
  
  referenceSelection(event): void {
    this.actions.changeReference(event.axis);
  }
  
  zeroSelection(event): void {
    this.actions.setZero(event.axis);
  }
  
  axisSelection(event): void {
    this.actions.setAxis(event.axis);
  }
}
