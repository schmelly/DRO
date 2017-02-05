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
import {Observable} from 'rxjs/Observable';
import {ICalculator} from '../reducers/calculator.reducers';

@Component({
  selector: 'calculatorView',
  styleUrls: ['./calculator.view.component.css'],
  templateUrl: './calculator.view.component.html'
})
export class CalculatorViewComponent {
  @Input() calculator:ICalculator;
  @Output() clearClick: EventEmitter<any> = new EventEmitter();
  @Output() decimalClick: EventEmitter<any> = new EventEmitter();
  @Output() directionClick: EventEmitter<any> = new EventEmitter();
  @Output() evalClick: EventEmitter<any> = new EventEmitter();
  @Output() functionClick: EventEmitter<any> = new EventEmitter();
  @Output() negateClick: EventEmitter<any> = new EventEmitter();
  @Output() numericClick: EventEmitter<any> = new EventEmitter();
  @Output() storeClick: EventEmitter<any> = new EventEmitter();

  numberFormat = new Intl.NumberFormat(
    'en', 
    {
      style: 'decimal',
      maximumFractionDigits: 4
    }
  );

  getDirectionStyle() {
      return this.calculator.direction;
  }
}
