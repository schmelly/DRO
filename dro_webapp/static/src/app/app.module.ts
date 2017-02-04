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
import {enableProdMode} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {NgReduxModule} from 'ng2-redux';

import {AppComponent} from './app.component';
import {AxisComponent} from './axis/axis.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {DisplayComponent} from './display/display.component';

import {SharedModule} from './shared/shared.module';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    AxisComponent,
    DisplayComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule.forRoot(),
    ReactiveFormsModule,
    SharedModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
