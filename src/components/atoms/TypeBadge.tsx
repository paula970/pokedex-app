import React from 'react';

interface TypeBadgeProps {
  type: string;
  backgroundColor: string;
  className?: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, backgroundColor, className = '' }) => {
  return (
    <span 
      className={`type-badge ${className}`}
      style={{ backgroundColor }}
    >
      {type}
    </span>
  );
};

export default TypeBadge;