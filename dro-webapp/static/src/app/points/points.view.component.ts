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
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { IPoint } from '../reducers/points.reducers';

@Component({
  selector: 'app-points-view',
  styleUrls: ['./points.view.component.css'],
  templateUrl: './points.view.component.html'
})
export class PointsViewComponent {

  @Input() points: Array<IPoint>;
  @Output() loadPointsClick: EventEmitter<any> = new EventEmitter();
  @Output() deletePointsClick: EventEmitter<any> = new EventEmitter();
  @Output() pointSelectedClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('fileInput') fileInput;

  numberFormat = new Intl.NumberFormat(
    'en',
    {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }
  );

  inputClick() {
    this.fileInput.nativeElement.value = null;
  }

  formatValue(value) {
    return this.numberFormat.format(value);
  }
}
