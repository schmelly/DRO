import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ICalculator} from '../reducers/calculator.reducers';

@Component({
  selector: 'calculator',
  styleUrls: ['./calculator.component.css'],
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
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
