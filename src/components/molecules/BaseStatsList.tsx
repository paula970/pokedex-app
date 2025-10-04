import React from 'react';
import BaseStatRow from './BaseStatRow';

interface BaseStatsListProps {
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  backgroundColor: string;
  className?: string;
}

const BaseStatsList: React.FC<BaseStatsListProps> = ({ 
  stats, 
  backgroundColor, 
  className = '' 
}) => {
  return (
    <div className={`stats-list ${className}`}>
      {stats.map((statData, index) => {
        const statName = statData.stat.name.toUpperCase();
        const statValue = statData.base_stat;
        
        return (
          <BaseStatRow
            key={index}
            statName={statName}
            statValue={statValue}
            backgroundColor={backgroundColor}
          />
        );
      })}
    </div>
  );
};

export default BaseStatsList;
