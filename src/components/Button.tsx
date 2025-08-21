
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', disabled = false }) => {
  const baseClasses = 'w-[280px] h-[40px] rounded-lg font-semibold text-wwg-gray-900 transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
