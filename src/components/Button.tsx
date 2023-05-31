import React, { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, className}) => {
  return (
    <button
      className={`bg-neutral-300 hover:bg-black hover:text-white text-black text-center text-3xl font-semibold py-4  w-[350px] rounded-3xl ${className}`}
      onClick={onClick}
      
    >
      {children}
    </button>
  );
};

export default Button;