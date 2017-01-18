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

/*import {SharedModule} from './shared/shared.module';*/

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
    /*SharedModule*/
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
