import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface IAxis {
  name: string;
  label: string;
  absValue: number;
  incValue: number;
  unit: string;
  reference: string;
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
      maximumFractionDigits: 4,
      minimumFractionDigits: 4
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

  getAxisValue() {
    if(this.axis.reference==='abs') {
      return this.axis.absValue;
    } else {
      return this.axis.incValue;
    }
  }
}
