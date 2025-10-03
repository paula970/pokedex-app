import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => (
  <button className="button" {...props}>
    {icon && <span className="button-icon">{icon}</span>}
    {children}
  </button>
);

export default Button;