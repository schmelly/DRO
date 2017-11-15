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
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgReduxModule } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routes/app-routes.module';
import { AxisComponent } from './axis/axis.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalculatorViewComponent } from './calculator/calculator.view.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationViewComponent } from './configuration/configuration.view.component';
import { ContourComponent } from './contour/contour.component';
import { ContourViewComponent } from './contour/contour.view.component';
import { DisplayComponent } from './display/display.component';
import { HolesComponent } from './holes/holes.component';
import { HolesViewComponent } from './holes/holes.view.component';
import { MidpointComponent } from './midpoint/midpoint.component';
import { MidpointViewComponent } from './midpoint/midpoint.view.component';
import { PocketComponent } from './pocket/pocket.component';
import { PocketViewComponent } from './pocket/pocket.view.component';
import { PointsComponent } from './points/points.component';
import { PointsViewComponent } from './points/points.view.component';
import { ShutdownComponent } from './shutdown/shutdown.component';
import { ShutdownViewComponent } from './shutdown/shutdown.view.component';

import { SocketService } from './shared/socket.service';


@NgModule({
  declarations: [
    AppComponent,
    AxisComponent,
    CalculatorComponent,
    CalculatorViewComponent,
    ConfigurationComponent,
    ConfigurationViewComponent,
    ContourComponent,
    ContourViewComponent,
    DisplayComponent,
    HolesComponent,
    HolesViewComponent,
    MidpointComponent,
    MidpointViewComponent,
    PocketComponent,
    PocketViewComponent,
    PointsComponent,
    PointsViewComponent,
    ShutdownComponent,
    ShutdownViewComponent
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    FormsModule,
    NgReduxModule,
  ],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
