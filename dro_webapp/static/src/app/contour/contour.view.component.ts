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
import {IPoint} from '../reducers/points.reducers';
import {IAxis} from '../reducers/axis.reducers';

interface Point2D {
  x: number;
  y: number;
}

@Component({
  selector: 'contourView',
  styleUrls: ['./contour.view.component.css'],
  templateUrl: './contour.view.component.html'
})
export class ContourViewComponent {

  @Input() contour:IContour;
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

  pointInTriangle(target: Point2D, p0:Point2D, p1: Point2D, p2: Point2D):boolean {
    var Area = 0.5 *(-p1.y*p2.x + p0.y*(-p1.x + p2.x) + p0.x*(p1.y - p2.y) + p1.x*p2.y);
    var s = 1/(2*Area)*(p0.y*p2.x - p0.x*p2.y + (p2.y - p0.y)*target.x + (p0.x - p2.x)*target.y);
    var t = 1/(2*Area)*(p0.x*p1.y - p0.y*p1.x + (p0.y - p1.y)*target.x + (p1.x - p0.x)*target.y);
    return (s>0) && (t>0) && ((1-s-t)>0);
  }

  getContourZClass(distance:number):string {

    if(this.contour.roughing && distance <= 0 && -distance <= this.contour.roughingOffset) {
      return "contour_collision_warning";
    }

    if(distance < 0) {
      return "contour_collision";
    } else {
      return "contour_ok";
    }
  }

  getTrianglePoint(vertex: Point2D, midpoint:Point2D, offsetFor:string, roughing:boolean, millOffset:number, roughingOffet:number):Point2D {
    var a = vertex.y - midpoint.y;
    var b = midpoint.x - vertex.x;
    var c = midpoint.x*vertex.y - vertex.x*midpoint.y;

    var pX:number, pY:number;

    switch(offsetFor) {
      case 'x':
      pX = vertex.x-millOffset;
      if(roughing) {
        pX = pX-roughingOffet;
      }
      pY = (c-a*pX)/b;
      break;
      case 'y':
      pY = vertex.y-millOffset;
      if(roughing) {
        pY = pY-roughingOffet;
      }
      pX = (c-b*pY)/a;
      break;
    }
    return {x:pX, y:pY};
  }

  getContourClass(target: Point2D, vertex1:Point2D, vertex2: Point2D, midpoint: Point2D, offsetFor:string, millOffset:number, roughingOffet:number):string {

    var trianglePoint1 = this.getTrianglePoint(vertex1, midpoint, offsetFor, false, millOffset, roughingOffet);
    var trianglePoint2 = this.getTrianglePoint(vertex2, midpoint, offsetFor, false, millOffset, roughingOffet);
    var roughingPoint1 = this.getTrianglePoint(vertex1, midpoint, offsetFor, true, millOffset, roughingOffet);
    var roughingPoint2 = this.getTrianglePoint(vertex2, midpoint, offsetFor, true, millOffset, roughingOffet);
    var pointInTriangle = this.pointInTriangle({x:target.x,y:target.y}, {x:trianglePoint1.x,y:trianglePoint1.y}, {x:trianglePoint2.x,y:trianglePoint2.y}, {x:midpoint.x,y:midpoint.y});
    var roughingPointInTriangle = this.pointInTriangle({x:target.x,y:target.y}, {x:roughingPoint1.x,y:roughingPoint1.y}, {x:roughingPoint2.x,y:roughingPoint2.y}, {x:midpoint.x,y:midpoint.y});

    if(this.contour.roughing && roughingPointInTriangle && !pointInTriangle) {
      return "contour_collision_warning";
    } else if(pointInTriangle) {
      return "contour_collision";
    } else {
      return "contour_ok";
    }
  }

  getTopLeft():Point2D {
    var pX = Math.min(this.contour.p1.x, this.contour.p2.x);
    var pY = Math.max(this.contour.p1.y, this.contour.p2.y);
    return {x:pX, y:pY};
  }

  getTopRight():Point2D {
    var pX = Math.max(this.contour.p1.x, this.contour.p2.x);
    var pY = Math.max(this.contour.p1.y, this.contour.p2.y);
    return {x:pX, y:pY};
  }

  getBottomLeft():Point2D {
    var pX = Math.min(this.contour.p1.x, this.contour.p2.x);
    var pY = Math.min(this.contour.p1.y, this.contour.p2.y);
    return {x:pX, y:pY};
  }

  getBottomRight():Point2D {
    var pX = Math.max(this.contour.p1.x, this.contour.p2.x);
    var pY = Math.min(this.contour.p1.y, this.contour.p2.y);
    return {x:pX, y:pY};
  }

  getMidPoint():Point2D {
    var mX = (this.contour.p1.x+this.contour.p2.x)/2;
    var mY = (this.contour.p1.y+this.contour.p2.y)/2;
    return {x: mX, y: mY};
  }

  getContourTopClass():string {
    var target:Point2D = {x: this.xAxis.absValue, y: this.yAxis.absValue};
    return this.getContourClass(target, this.getTopLeft(), this.getTopRight(), this.getMidPoint(), 'y', -this.contour.millRadius, -this.contour.roughingOffset);
  }

  getContourBottomClass():string {
    var target:Point2D = {x: this.xAxis.absValue, y: this.yAxis.absValue};
    return this.getContourClass(target, this.getBottomLeft(), this.getBottomRight(), this.getMidPoint(), 'y', this.contour.millRadius, this.contour.roughingOffset);
  }

  getContourRightClass():string {
    var target:Point2D = {x: this.xAxis.absValue, y: this.yAxis.absValue};
    return this.getContourClass(target, this.getBottomRight(), this.getTopRight(), this.getMidPoint(), 'x', -this.contour.millRadius, -this.contour.roughingOffset);
  }

  getContourLeftClass():string {
    var target:Point2D = {x: this.xAxis.absValue, y: this.yAxis.absValue};
    return this.getContourClass(target, this.getBottomLeft(), this.getTopLeft(), this.getMidPoint(), 'x', this.contour.millRadius, this.contour.roughingOffset);
  }

  getContourBottomZClass():string {

    return this.getContourZClass(this.getContourDistZ());
  }

  getContourDrillTransform():string {

    var xMin = Math.min(this.contour.p1.x, this.contour.p2.x);
    var xMax = Math.max(this.contour.p1.x, this.contour.p2.x);
    var yMin = Math.min(this.contour.p1.y, this.contour.p2.y);
    var yMax = Math.max(this.contour.p1.y, this.contour.p2.y);
    var xLocation;
    var yLocation;

    xMin = xMin - this.contour.millRadius;
    xMax = xMax + this.contour.millRadius;
    yMin = yMin - this.contour.millRadius;
    yMax = yMax + this.contour.millRadius;

    if(this.contour.roughing) {
      xMin = xMin - this.contour.roughingOffset;
      xMax = xMax + this.contour.roughingOffset;
      yMin = yMin - this.contour.roughingOffset;
      yMax = yMax + this.contour.roughingOffset;
    }

    if((xMax-xMin)<=0) {
      xLocation = 0;
    } else {
      xLocation = (this.xAxis.absValue-xMin) / (xMax-xMin);
    }
    xLocation = 50*xLocation;

    if((yMax-yMin)<=0) {
      yLocation = 0;
    } else {
      yLocation = (this.yAxis.absValue-yMin) / (yMax-yMin) * -1;
    }
    yLocation = 50*yLocation;

    return `translate(${xLocation},${yLocation})`;
  }
  
  getContourDrillTransformZ():string {

    var zMax = Math.max(this.contour.p1.z, this.contour.p2.z);
    var zLocation;

    if(this.contour.roughing) {
      zMax = zMax + this.contour.roughingOffset;
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

  getDistLabel(distance:number):string {
    return `${this.pointNumberFormat.format(distance)}`
  }

  getPointDistance(c1:number, c2:number):number {
    var distance = c2 - c1 - this.contour.millRadius;
    if(this.contour.roughing) {
      distance = distance - this.contour.roughingOffset;
    }
    return distance;
  }

  getContourDistTop():number {
    var relevantValue = Math.max(this.contour.p1.y, this.contour.p2.y);
    return this.getPointDistance(relevantValue, this.yAxis.absValue);
  }

  getContourDistBottom():number {
    var relevantValue = Math.min(this.contour.p1.y, this.contour.p2.y);
    return this.getPointDistance(this.yAxis.absValue, relevantValue);
  }

  getContourDistLeft():number {
    var relevantValue = Math.min(this.contour.p1.x, this.contour.p2.x);
    return this.getPointDistance(this.xAxis.absValue, relevantValue);
  }

  getContourDistRight():number {
    var relevantValue = Math.max(this.contour.p1.x, this.contour.p2.x);
    return this.getPointDistance(relevantValue, this.xAxis.absValue);
  }
  
  getContourDistZ():number {
    var relevantValue = Math.max(this.contour.p1.z, this.contour.p2.z);
    if(this.contour.roughing) {
        relevantValue = relevantValue + this.contour.roughingOffset;
    }
    var distance = this.zAxis.absValue - relevantValue;
    return distance;
  }

  getPointOption(point:IPoint):string {
    return `${point.name}: [${this.pointNumberFormat.format(point.x)},${this.pointNumberFormat.format(point.y)},${this.pointNumberFormat.format(point.z)}]`;
  }

  getFinishMode(id:string):string {
    switch(this.contour.roughing) {
      case true:
        return "roughing";
      case false:
        return "finishing";
    }
  }

  getP1() {
    return this.contour.p1;
  }

  getP2() {
    return this.contour.p2;
  }
}
