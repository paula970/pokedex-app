// base statistics row

import StatBar from '../atoms/StatBar';

interface BaseStatRowProps {
  statName: string;
  statValue: number;
  backgroundColor: string;
  className?: string;
}

const BaseStatRow = ({ 
  statName, 
  statValue, 
  backgroundColor, 
  className = '' 
}: BaseStatRowProps) => {
  return (
    <div className={`stat-row ${className}`}>
      <span className="stat-name" style={{ color: backgroundColor }}>
        {statName}
      </span>
      <span className="stat-number">
        {statValue.toString().padStart(3, '0')}
      </span>
      <StatBar
        value={statValue}
        backgroundColor={backgroundColor}
      />
    </div>
  );
};

export default BaseStatRow;
