import React from 'react';

interface StatBarProps {
  value: number;
  maxValue?: number;
  backgroundColor: string;
  className?: string;
}

const StatBar: React.FC<StatBarProps> = ({ 
  value, 
  maxValue = 255, 
  backgroundColor, 
  className = '' 
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className={`stat-bar-container ${className}`}>
      <div 
        className="stat-bar" 
        style={{ 
          width: `${percentage}%`,
          backgroundColor 
        }}
      />
    </div>
  );
};

export default StatBar;
