import {Component} from '@angular/core';  
import {AsyncPipe} from '@angular/common';
import {NgRedux, select} from 'ng2-redux';
import {Observable} from 'rxjs';

import {IAxis} from '../axis/axis.component';
import {AxisActions} from '../actions/axis.actions';
import {IAppState} from '../reducers/app.reducers';

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
