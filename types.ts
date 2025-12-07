export enum CalculatorActionType {
  ADD_DIGIT = 'ADD_DIGIT',
  CHOOSE_OPERATION = 'CHOOSE_OPERATION',
  CLEAR = 'CLEAR',
  DELETE_DIGIT = 'DELETE_DIGIT',
  EVALUATE = 'EVALUATE',
}

export enum Operation {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '×',
  DIVIDE = '÷',
}

export interface CalculatorState {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: Operation | null;
  overwrite: boolean;
}

export interface CalculatorAction {
  type: CalculatorActionType;
  payload?: {
    digit?: string;
    operation?: Operation;
  };
}

export interface ButtonConfig {
  label: string;
  type: 'digit' | 'operator' | 'function';
  action: CalculatorActionType;
  payload?: any;
  className?: string; // For special styling like the zero button or orange operator buttons
}