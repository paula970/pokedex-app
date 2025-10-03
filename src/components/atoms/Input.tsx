import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon, ...props }) => (
  <div className="input-wrapper">
    {icon && <span className="input-icon">{icon}</span>}
    <input className="input" {...props} />
  </div>
);

export default Input;