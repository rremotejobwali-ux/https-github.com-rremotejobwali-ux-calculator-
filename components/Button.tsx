import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  isOperator?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '', isOperator = false }) => {
  // Base classes for all buttons
  const baseClasses = `
    h-16 sm:h-20 
    text-2xl font-medium 
    flex items-center justify-center 
    transition-all duration-150 active:scale-95 
    select-none rounded-2xl
  `;
  
  // Default styling if no specific override is provided
  const defaultColorClasses = isOperator 
    ? 'bg-orange-500 text-white hover:bg-orange-400' 
    : 'bg-slate-700 text-white hover:bg-slate-600';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className || defaultColorClasses}`}
      type="button"
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Button;