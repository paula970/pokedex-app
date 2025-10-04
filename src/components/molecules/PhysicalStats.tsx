import React from 'react';
import PhysicalStat from './PhysicalStat';
import weightIcon from '../../assets/icons/weight.svg';
import straightenIcon from '../../assets/icons/straighten.svg';

interface PhysicalStatsProps {
  weight: number;
  height: number;
  abilities: Array<{ ability: { name: string } }>;
  className?: string;
}

const PhysicalStats: React.FC<PhysicalStatsProps> = ({ 
  weight, 
  height, 
  abilities, 
  className = '' 
}) => {
  const weightKg = (weight / 10).toFixed(1);
  const heightM = (height / 10).toFixed(1);
  const abilitiesText = abilities.map(a => a.ability.name).join(', ');

  return (
    <div className={`pokemon-physical-stats ${className}`}>
      <PhysicalStat
        iconSrc={weightIcon}
        iconAlt="Weight"
        value={`${weightKg} kg`}
        label="Weight"
      />
      
      <div className="stat-divider"></div>
      
      <PhysicalStat
        iconSrc={straightenIcon}
        iconAlt="Height"
        value={`${heightM} m`}
        label="Height"
      />
      
      <div className="stat-divider"></div>
      
      <PhysicalStat
        value={abilitiesText}
        label="Moves"
      />
    </div>
  );
};

export default PhysicalStats;
