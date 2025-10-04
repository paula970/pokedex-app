import React from 'react';

interface StatIconProps {
  src: string;
  alt: string;
  className?: string;
}

const StatIcon: React.FC<StatIconProps> = ({ src, alt, className = '' }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`stat-icon ${className}`}
    />
  );
};

export default StatIcon;
