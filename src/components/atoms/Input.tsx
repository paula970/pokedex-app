import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = ({ icon, ...props }: InputProps) => (
  <div className="input-wrapper">
    {icon && <span className="input-icon">{icon}</span>}
    <input className="input" {...props} />
  </div>
);

export default Input;