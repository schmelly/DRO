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
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface IAxis {
  name: string;
  label: string;
  absValue: number;
  incValue: number;
  unit: string;
  reference: string;
  magIndicator: number;
}

@Component({
  selector: 'axis',
  styleUrls: ['./axis.component.css'],
  templateUrl: './axis.component.html'
})
export class AxisComponent {

  numberFormat = new Intl.NumberFormat(
    'en', 
    {
      style: 'decimal',
      maximumFractionDigits: 3,
      minimumFractionDigits: 3
    }
  );

  @Input() axis:IAxis;
  @Output() unitSelection: EventEmitter<any> = new EventEmitter();
  @Output() referenceSelection: EventEmitter<any> = new EventEmitter();
  @Output() zeroSelection: EventEmitter<any> = new EventEmitter();
  @Output() axisSelection: EventEmitter<any> = new EventEmitter();

  getUnitStyle(unitLabel:string) {
    if(unitLabel===this.axis.unit) {
      return 'selected';
    } else {
      return '';
    }
  }

  getReferenceStyle(referenceLabel:string) {
    if(referenceLabel===this.axis.reference) {
      return 'selected';
    } else {
      return '';
    }
  }

  getMagLabelStyle() {
    switch(this.axis.magIndicator) {
      case 0:
        return 'magGreen';
      case 6:
        return 'magYellow';
      case 7:
        return 'magRed';
      default:
      return 'magYellow';
    }
  }

  getAxisValue() {
    if(this.axis.reference==='abs') {
      return this.axis.absValue;
    } else {
      return this.axis.incValue;
    }
  }
}
