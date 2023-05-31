import React, { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, className}) => {
  return (
    <button
      className={`bg-gray-500 hover:bg-black text-white text-5xl font-bold py-8 px-16 rounded-3xl ${className}`}
      onClick={onClick}
      
    >
      {children}
    </button>
  );
};

export default Button;