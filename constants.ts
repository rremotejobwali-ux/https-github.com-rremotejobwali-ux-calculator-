import { ButtonConfig, CalculatorActionType, Operation } from './types';

export const CALCULATOR_BUTTONS: ButtonConfig[][] = [
  [
    { label: 'AC', type: 'function', action: CalculatorActionType.CLEAR, className: 'col-span-2 bg-slate-400 text-slate-900 hover:bg-slate-300' },
    { label: 'DEL', type: 'function', action: CalculatorActionType.DELETE_DIGIT, className: 'bg-slate-400 text-slate-900 hover:bg-slate-300' },
    { label: '÷', type: 'operator', action: CalculatorActionType.CHOOSE_OPERATION, payload: { operation: Operation.DIVIDE } },
  ],
  [
    { label: '7', type: 'digit', action: CalculatorActionType.ADD_DIGIT, payload: { digit: '7' } },
    { label: '8', type: 'digit', action: CalculatorActionType.ADD_DIGIT, payload: { digit: '8' } },
    { label: '9', type: 'digit', action: CalculatorActionType.ADD_DIGIT, payload: { digit: '9' } },
    { label: '×', type: 'operator', action: CalculatorActionType.CHOOSE_OPERATION, payload: { operation: Operation.MULTIPLY } },
  ],
  [
    { label: '4', type: 'digit', action: CalculatorActionType.ADD_DIGIT, payload: { digit: '4' } },
    { label: '5', type: 'digit', action: CalculatorActionType.ADD_DIGIT, payload: { digit: '5' } },
    { label: '6', type: 'digit', action: CalculatorActionType.ADD_DIGIT, payload: { digit: '6' } },
    { label: '-', type: 'operator', action: CalculatorActionType.CHOOSE_OPERATION, payload: { operation: Operation.SUBTRACT } },
  ],
  [
    { label: '1', type: 'digit', action: CalculatorActionType.ADD_DIGIT, payload: { digit: '1' } },
    { label: '2', type: 'digit', action: CalculatorActionType.ADD_DIGIT, payload: { digit: '2' } },
    { label: '3', type: 'digit', action: CalculatorActionType.ADD_DIGIT, payload: { digit: '3' } },
    { label: '+', type: 'operator', action: CalculatorActionType.CHOOSE_OPERATION, payload: { operation: Operation.ADD } },
  ],
  [
    { label: '0', type: 'digit', action: CalculatorActionType.ADD_DIGIT, payload: { digit: '0' }, className: 'col-span-2 rounded-l-full' },
    { label: '.', type: 'digit', action: CalculatorActionType.ADD_DIGIT, payload: { digit: '.' } },
    { label: '=', type: 'function', action: CalculatorActionType.EVALUATE, className: 'bg-indigo-500 hover:bg-indigo-400 text-white' },
  ],
];