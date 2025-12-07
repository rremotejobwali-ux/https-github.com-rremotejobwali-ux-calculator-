import React, { useReducer, useEffect, useCallback } from 'react';
import { CalculatorState, CalculatorAction, CalculatorActionType, Operation } from './types';
import { CALCULATOR_BUTTONS } from './constants';
import Button from './components/Button';
import Display from './components/Display';

const initialState: CalculatorState = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
  overwrite: false,
};

const evaluate = ({ currentOperand, previousOperand, operation }: CalculatorState): string => {
  const prev = parseFloat(previousOperand || '0');
  const current = parseFloat(currentOperand || '0');
  if (isNaN(prev) || isNaN(current)) return '';

  let computation = 0;
  switch (operation) {
    case Operation.ADD:
      computation = prev + current;
      break;
    case Operation.SUBTRACT:
      computation = prev - current;
      break;
    case Operation.MULTIPLY:
      computation = prev * current;
      break;
    case Operation.DIVIDE:
      computation = prev / current;
      break;
  }

  // Handle precision issues broadly and strip trailing zeros
  return Number(computation.toPrecision(15)).toString();
};

const reducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case CalculatorActionType.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.payload?.digit || null,
          overwrite: false,
        };
      }
      if (action.payload?.digit === '0' && state.currentOperand === '0') return state;
      if (action.payload?.digit === '.' && state.currentOperand?.includes('.')) return state;
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.payload?.digit}`,
      };

    case CalculatorActionType.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) return state;

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: action.payload?.operation || null,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: action.payload?.operation || null,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload?.operation || null,
        currentOperand: null,
      };

    case CalculatorActionType.CLEAR:
      return initialState;

    case CalculatorActionType.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case CalculatorActionType.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    default:
      return state;
  }
};

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, initialState);

  // Keyboard support
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') {
      dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: { digit: e.key } });
    } else if (e.key === '.') {
      dispatch({ type: CalculatorActionType.ADD_DIGIT, payload: { digit: '.' } });
    } else if (e.key === '=' || e.key === 'Enter') {
      e.preventDefault();
      dispatch({ type: CalculatorActionType.EVALUATE });
    } else if (e.key === 'Backspace') {
      dispatch({ type: CalculatorActionType.DELETE_DIGIT });
    } else if (e.key === 'Escape') {
      dispatch({ type: CalculatorActionType.CLEAR });
    } else if (e.key === '+') {
      dispatch({ type: CalculatorActionType.CHOOSE_OPERATION, payload: { operation: Operation.ADD } });
    } else if (e.key === '-') {
      dispatch({ type: CalculatorActionType.CHOOSE_OPERATION, payload: { operation: Operation.SUBTRACT } });
    } else if (e.key === '*') {
      dispatch({ type: CalculatorActionType.CHOOSE_OPERATION, payload: { operation: Operation.MULTIPLY } });
    } else if (e.key === '/') {
      dispatch({ type: CalculatorActionType.CHOOSE_OPERATION, payload: { operation: Operation.DIVIDE } });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      <div className="w-full max-w-sm bg-slate-800 rounded-[2.5rem] p-6 shadow-2xl border border-slate-700/50">
        
        {/* Header / Branding */}
        <div className="flex justify-between items-center mb-6 px-2">
          <h1 className="text-slate-400 font-semibold tracking-wide text-sm uppercase">ZenCalc</h1>
          <div className="flex gap-1.5">
             <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
             <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
        </div>

        <Display 
          previousOperand={previousOperand} 
          currentOperand={currentOperand} 
          operation={operation} 
        />

        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {CALCULATOR_BUTTONS.flat().map((btnConfig, index) => (
            <Button
              key={`${btnConfig.label}-${index}`}
              label={btnConfig.label}
              onClick={() => dispatch({ 
                type: btnConfig.action, 
                payload: btnConfig.payload 
              })}
              className={`${btnConfig.className || ''} ${btnConfig.label === '0' ? 'col-span-2' : ''}`}
              isOperator={btnConfig.type === 'operator'}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-slate-600 text-xs">Press keys or use on-screen buttons</p>
        </div>
      </div>
    </div>
  );
}

export default App;