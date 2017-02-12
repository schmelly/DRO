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

import {IPocket} from '../reducers/pocket.reducers';
import {IPoint} from '../reducers/points.reducers';
import {IAxis} from '../axis/axis.component';

@Component({
  selector: 'pocketView',
  styleUrls: ['./pocket.view.component.css'],
  templateUrl: './pocket.view.component.html'
})
export class PocketViewComponent {

  @Input() pocket:IPocket;
  @Input() points:Array<IPoint>;
  @Input() xAxis:IAxis;
  @Input() yAxis:IAxis;
  @Input() zAxis:IAxis;
  @Output() p1Select: EventEmitter<any> = new EventEmitter();
  @Output() p2Select: EventEmitter<any> = new EventEmitter();
  @Output() radioSelect: EventEmitter<any> = new EventEmitter();

  private pointNumberFormat = new Intl.NumberFormat(
    'en', 
    {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 3
    }
  );

  getPocketClass(distance:number):string {

    if(this.pocket.roughing && distance <= 0 && -distance <= this.pocket.roughingOffset) {
      return "pocket_collision_warning";
    }

    if(distance < 0) {
      return "pocket_collision";
    } else {
      return "pocket_ok";
    }
  }

  getPocketTopClass():string {

    return this.getPocketClass(this.getPocketDistTop());
  }

  getPocketBottomClass() {

    return this.getPocketClass(this.getPocketDistBottom());
  }

  getPocketRightClass() {

    return this.getPocketClass(this.getPocketDistRight());
  }

  getPocketLeftClass() {

    return this.getPocketClass(this.getPocketDistLeft());
  }

  getPocketBottomZClass() {

    return this.getPocketClass(this.getPocketDistZ());
  }

  getPocketDrillTransform() {

    var xMin = Math.min(this.pocket.p1.x, this.pocket.p2.x);
    var xMax = Math.max(this.pocket.p1.x, this.pocket.p2.x);
    var yMin = Math.min(this.pocket.p1.y, this.pocket.p2.y);
    var yMax = Math.max(this.pocket.p1.y, this.pocket.p2.y);
    var xLocation;
    var yLocation;

    xMin = xMin + this.pocket.millRadius;
    xMax = xMax - this.pocket.millRadius;
    yMin = yMin + this.pocket.millRadius;
    yMax = yMax - this.pocket.millRadius;

    if(this.pocket.roughing) {
      xMin = xMin + this.pocket.roughingOffset;
      xMax = xMax - this.pocket.roughingOffset;
      yMin = yMin + this.pocket.roughingOffset;
      yMax = yMax - this.pocket.roughingOffset;
    }

    if((xMax-xMin)<=0) {
      xLocation = 0;
    } else {
      xLocation = (this.xAxis.absValue-xMin) / (xMax-xMin);
    }
    xLocation = 70*xLocation;

    if((yMax-yMin)<=0) {
      yLocation = 0;
    } else {
      yLocation = (this.yAxis.absValue-yMin) / (yMax-yMin) * -1;
    }
    yLocation = 70*yLocation;

    return `translate(${xLocation},${yLocation})`;
  }
  
  getPocketDrillTransformZ() {

    var zMax = Math.max(this.pocket.p1.z, this.pocket.p2.z);
    var zLocation;

    if(this.pocket.roughing) {
      zMax = zMax + this.pocket.roughingOffset;
    }
    if(zMax==0) {
      zLocation = 0;
    }
    else {
      zLocation = this.zAxis.absValue / zMax ;
    }
    zLocation = 25*zLocation;

    return `translate(0,${zLocation})`;
  }

  getDistLabel(distance:number) {
    return `${this.pointNumberFormat.format(distance)}`
  }

  getPointDistance(c1:number, c2:number):number {
    var distance = c2 - c1 - this.pocket.millRadius;
    if(this.pocket.roughing) {
      distance = distance - this.pocket.roughingOffset;
    }
    return distance;
  }

  getPocketDistTop() {
    var relevantValue = Math.max(this.pocket.p1.y, this.pocket.p2.y);
    return this.getPointDistance(this.yAxis.absValue, relevantValue);
  }

  getPocketDistBottom() {
    var relevantValue = Math.min(this.pocket.p1.y, this.pocket.p2.y);
    return this.getPointDistance(relevantValue, this.yAxis.absValue);
  }

  getPocketDistLeft() {
    var relevantValue = Math.min(this.pocket.p1.x, this.pocket.p2.x);
    return this.getPointDistance(relevantValue, this.xAxis.absValue);
  }

  getPocketDistRight() {
    var relevantValue = Math.max(this.pocket.p1.x, this.pocket.p2.x);
    return this.getPointDistance(this.xAxis.absValue, relevantValue);
  }
  
  getPocketDistZ() {
    var relevantValue = Math.max(this.pocket.p1.z, this.pocket.p2.z);
    if(this.pocket.roughing) {
        relevantValue = relevantValue + this.pocket.roughingOffset;
    }
    var distance = this.zAxis.absValue - relevantValue;
    return distance;
  }

  getPointOption(point:IPoint) {
    return `${point.name}: [${this.pointNumberFormat.format(point.x)},${this.pointNumberFormat.format(point.y)},${this.pointNumberFormat.format(point.z)}]`;
  }

  getFinishMode(id:string) {
    switch(this.pocket.roughing) {
      case true:
        return "roughing";
      case false:
        return "finishing";
    }
  }
}
