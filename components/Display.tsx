import React from 'react';

interface DisplayProps {
  previousOperand: string | null;
  currentOperand: string | null;
  operation: string | null;
}

const formatOperand = (operand: string | null): string => {
  if (operand == null) return '';
  // Split for decimal formatting to avoid losing trailing zeros or just typed decimal points
  const [integer, decimal] = operand.split('.');
  
  if (decimal == null) {
    // Basic integer formatting
    return new Intl.NumberFormat('en-US').format(parseFloat(integer));
  }
  
  // Decimal formatting
  return `${new Intl.NumberFormat('en-US').format(parseFloat(integer))}.${decimal}`;
};

const Display: React.FC<DisplayProps> = ({ previousOperand, currentOperand, operation }) => {
  return (
    <div className="flex flex-col items-end justify-end w-full px-6 py-8 mb-4 bg-slate-950 rounded-3xl min-h-[140px] shadow-inner break-words break-all">
      <div className="text-slate-400 text-lg font-medium min-h-[1.75rem] transition-all opacity-80">
        {formatOperand(previousOperand)} {operation}
      </div>
      <div className="text-white text-5xl sm:text-6xl font-light tracking-tight mt-1 overflow-x-auto w-full text-right scrollbar-hide">
        {currentOperand ? formatOperand(currentOperand) : '0'}
      </div>
    </div>
  );
};

export default Display;