import React from 'react';
import StatIcon from '../atoms/StatIcon';

interface PhysicalStatProps {
  iconSrc?: string;
  iconAlt?: string;
  value: string;
  label: string;
  className?: string;
}

const PhysicalStat: React.FC<PhysicalStatProps> = ({ 
  iconSrc, 
  iconAlt, 
  value, 
  label, 
  className = '' 
}) => {
  return (
    <div className={`stat-item ${className}`}>
      <div className="stat-value">
        {iconSrc && <StatIcon src={iconSrc} alt={iconAlt || label} />}
        {value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default PhysicalStat;
