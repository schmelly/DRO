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

import {CALCULATOR, DIRECTION, DISPLAY_STRING} from '../actions/calculator.actions';

export interface op {
    (firstOperand: number, secondOperand: number): number;
}

export interface ICalculator {
    displayString: string;
    displayValue: number;
    buffer: number;
    memoryValue: number;
    op: op;
    direction: string;
}

export interface ICalculatorState {
    calculator: ICalculator;
};

export const INITIAL_CALCULATOR_STATE:ICalculatorState = {
  calculator: {
      displayString: '0',
      displayValue: undefined,
      buffer: undefined,
      memoryValue: undefined,
      op: undefined,
      direction: 'left'
  }
};

const numericRegExp = new RegExp('^[0-9\.]$');
const functionRegExp = new RegExp('^([\-\+\*/])|(sin)|(cos)|(tan)|(sqrt)$');
const evalRegExp = new RegExp('^[=]$');
const negRegExp = new RegExp('^(neg)$');
const storeRegExp = new RegExp('^(MC)|(MR)|(M+)|(M-)|(Ms)$');
const clearRegExp = new RegExp('^(CE)|(C)|(del)$');

var numberFormat = new Intl.NumberFormat(
'en', 
{
    style: 'decimal',
    maximumFractionDigits: 4,
    useGrouping: false
});

function handleNumeric(calc:ICalculator, button:string) {

    if(button==='.') {
        if(calc.displayString.indexOf('.')>=0 || calc.displayString.length===0) {
            return;
        }
    }

    calc.displayString = calc.displayString + button;

    if(calc.displayString.startsWith('0') && calc.displayString.length>1) {
        calc.displayString = calc.displayString.substring(1);
    }
}

//'^[/\+\-\*]|(sin)|(cos)|(tan)|(sqr)$'
function handleFunction(calc:ICalculator, button:string) {

    handleEval(calc);
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
            handleEval(calc);
        break;
        case 'cos':
            calc.op = (a:number, b:number)=>{return Math.cos(a);};
            handleEval(calc);
        break;
        case 'tan':
            calc.op = (a:number, b:number)=>{return Math.tan(a);};
            handleEval(calc);
        break;
        case 'sqrt':
            calc.op = (a:number, b:number)=>{return Math.sqrt(a);};
            handleEval(calc);
        break;
    }
}

function handleEval(calc:ICalculator) {

    calc.displayValue = Number(calc.displayString);
    calc.displayString = numberFormat.format(calc.displayValue);

    if(calc.op!==undefined) {
        calc.displayValue = calc.op(calc.buffer, calc.displayValue);
        calc.buffer = undefined;
        calc.op = undefined;
        calc.displayString = numberFormat.format(calc.displayValue);
    }
}

function handleNeg(calc:ICalculator) {
    if(calc.displayString.startsWith('-')) {
        calc.displayString = calc.displayString.substring(1);
    } else {
        calc.displayString = '-' + calc.displayString;
    }
}

function handleStore(calc:ICalculator, button:string) {
}

function handleClear(calc:ICalculator, button:string) {
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
}

function handleDir(calc:ICalculator) {
    switch(calc.direction) {
        case 'left':
            calc.direction = 'right';
        break;
        default:
            calc.direction = 'left';
        break;
    }
}

export function calculatorReducer(state:ICalculatorState = INITIAL_CALCULATOR_STATE, action): ICalculatorState {
    
    var stateCopy:ICalculatorState = Object.assign({}, state);
    var calc:ICalculator = stateCopy.calculator;

    switch(action.type) {
        case CALCULATOR:
            stateCopy.calculator = action.calculator;
        break;
        case DIRECTION:
            calc.direction = action.direction;
        break;
        case DISPLAY_STRING:
            calc.displayString = action.displayString;
        break;
    }

    return stateCopy;
};
