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
import {Component, EventEmitter, Input, Output, ViewChild, ElementRef} from '@angular/core';

import {IContour} from '../reducers/contour.reducers';
import {IAxis} from '../axis/axis.component';

@Component({
  selector: 'contourView',
  styleUrls: ['./contour.view.component.css'],
  templateUrl: './contour.view.component.html'
})
export class ContourViewComponent {

  @Input() contour:IContour;
  @Input() xAxis:IAxis;
  @Input() yAxis:IAxis;
  @Input() zAxis:IAxis;

  private p1 = [0,0];
  private p2 = [10,10];

  getPocketTopClass():string {

    if(this.yAxis.incValue > this.p2[1]) {
      return "pocket_collision";
    } else {
      return "pocket_ok";
    }
  }

  getPocketBottomClass() {

    if(this.yAxis.incValue < this.p1[1]) {
      return "pocket_collision";
    } else {
      return "pocket_ok";
    }
  }

  getPocketRightClass() {

    if(this.xAxis.incValue > this.p2[0]) {
      return "pocket_collision";
    } else {
      return "pocket_ok";
    }
  }

  getPocketLeftClass() {

    if(this.xAxis.incValue < this.p1[0]) {
      return "pocket_collision";
    } else {
      return "pocket_ok";
    }
  }

  getPocketDrillTransform() {

    var xLocation = this.xAxis.incValue / (this.p2[0]-this.p1[0]);
    console.log(xLocation);
    xLocation = 80*xLocation+10-50;

    var yLocation = this.yAxis.incValue / (this.p2[1]-this.p1[1]);
    yLocation = 80*yLocation+10-50;

    console.log(`translate(${xLocation},${yLocation})`);

    return `translate(${xLocation},${yLocation})`;
  }

  getPocketP1() {
    return "[0,0]";
  }

  getPocketP2() {
    return "[10,10]";
  }
}
