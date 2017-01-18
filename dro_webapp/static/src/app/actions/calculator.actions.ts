
import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {Action, Dispatch} from 'redux';

import {IAppState} from '../reducers/app.reducers';
import {ICalculator} from '../reducers/calculator.reducers';
import * as selectors from './selectors';

export const CALCULATOR:string = 'CALCULATOR';
export const DIRECTION:string = 'DIRECTION';
export const DISPLAY_STRING:string = 'DISPLAY_STRING';

var numberFormat = new Intl.NumberFormat(
'en', 
{
    style: 'decimal',
    maximumFractionDigits: 4,
    useGrouping: false
});

@Injectable()
export class CalculatorActions {
  
  constructor(private ngRedux: NgRedux<IAppState>) {}

  evaluate(calc:ICalculator) {
    calc.displayValue = Number(calc.displayString);
    calc.displayString = numberFormat.format(calc.displayValue);

    if(calc.op!==undefined) {
      calc.displayValue = calc.op(calc.buffer, calc.displayValue);
      calc.buffer = undefined;
      calc.op = undefined;
      calc.displayString = numberFormat.format(calc.displayValue);
    }
  }

  clearClick(button:string) {
    
    var calc:ICalculator = {...selectors.selectCalculator(this.ngRedux.getState())};
    this.evaluate(calc);

    switch(button) {
      case 'CE':
        calc.buffer = undefined;
        calc.displayString = '0';
        calc.displayValue = undefined;
        calc.memoryValue = undefined;
        calc.op = undefined;
      break;
      case 'C':
        calc.displayString = '0';
        calc.displayValue = 0;
      break;
      case 'del':
        if(calc.displayString.length > 0) {
            calc.displayString = calc.displayString.substring(0, calc.displayString.length-1); 
        }
        if(calc.displayString.length===0 || calc.displayString==='-') {
            calc.displayString = '0';
        }
      break;
    }

    this.ngRedux.dispatch({type: CALCULATOR, calculator: calc});
  }

  decimalClick(button:string) {
    var displayString = selectors.selectDisplayString(this.ngRedux.getState())
    if(displayString.indexOf('.')>=0 || displayString.length===0) {
      return;
    }
    displayString = displayString + button;
    this.ngRedux.dispatch({type: DISPLAY_STRING, displayString: displayString});
  }

  directionClick(button:string) {
    var dir = selectors.selectDirection(this.ngRedux.getState());
    switch(dir) {
      case 'left':
        this.ngRedux.dispatch({type: DIRECTION, direction: 'right'});
      break;
      default:
        this.ngRedux.dispatch({type: DIRECTION, direction: 'left'});
      break;
    }
  }

  evalClick(button:string) {
    
    var calc:ICalculator = {...selectors.selectCalculator(this.ngRedux.getState())};
    this.evaluate(calc);

    this.ngRedux.dispatch({type: CALCULATOR, calculator: calc});
  }

  functionClick(button:string) {

    var calc:ICalculator = {...selectors.selectCalculator(this.ngRedux.getState())};

    this.evaluate(calc);
    calc.buffer = calc.displayValue;

    switch(button) {
      case '/':
        calc.op = (a:number, b:number)=>{return a/b;};
        calc.displayString = '0';
        calc.displayValue = 0;
      break;
      case '+':
        calc.op = (a:number, b:number)=>{return a+b;};
        calc.displayString = '0';
        calc.displayValue = 0;
      break;
      case '-':
        calc.op = (a:number, b:number)=>{return a-b;};
        calc.displayString = '0';
        calc.displayValue = 0;
      break;
      case '*':
        calc.op=(a:number, b:number)=>{return a*b;};
        calc.displayString = '0';
        calc.displayValue = 0;
      break;
      case 'sin':
        calc.op = (a:number, b:number)=>{return Math.sin(a);};
        this.evaluate(calc);
      break;
      case 'cos':
        calc.op = (a:number, b:number)=>{return Math.cos(a);};
        this.evaluate(calc);
      break;
      case 'tan':
        calc.op = (a:number, b:number)=>{return Math.tan(a);};
        this.evaluate(calc);
      break;
      case 'sqrt':
        calc.op = (a:number, b:number)=>{return Math.sqrt(a);};
        this.evaluate(calc);
      break;
    }

    this.ngRedux.dispatch({type: CALCULATOR, calculator: calc});
  }

  negateClick(button:string) {
    
    var displayString = selectors.selectDisplayString(this.ngRedux.getState());
    if(displayString.startsWith('-')) {
        displayString = displayString.substring(1);
    } else {
        displayString = '-' + displayString;
    }

    this.ngRedux.dispatch({type: DISPLAY_STRING, displayString: displayString});
  }

  numericClick(button:string) {
    var displayString = selectors.selectDisplayString(this.ngRedux.getState())
    displayString = displayString + button;
    
    if(displayString.startsWith('0') && displayString.length>1) {
      displayString = displayString.substring(1);
    }
    this.ngRedux.dispatch({type: DISPLAY_STRING, displayString: displayString});
  }

  storeClick(button:string) {
  }
}
