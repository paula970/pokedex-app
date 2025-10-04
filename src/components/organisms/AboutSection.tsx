import React from 'react';
import TypesList from '../molecules/TypesList';
import PhysicalStats from '../molecules/PhysicalStats';

interface AboutSectionProps {
  types: Array<{ type: { name: string } }>;
  weight: number;
  height: number;
  abilities: Array<{ ability: { name: string } }>;
  description?: string;
  titleColor: string;
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  types,
  weight,
  height,
  abilities,
  description,
  titleColor,
  className = ''
}) => {
  return (
    <>
      {/* Types */}
      <TypesList types={types} />

      {/* About Section */}
      <section className={`pokemon-about ${className}`}>
        <h2 style={{ color: titleColor }}>About</h2>
        
        <PhysicalStats
          weight={weight}
          height={height}
          abilities={abilities}
        />

        {/* Description */}
        {description && (
          <p className="pokemon-description">
            {description}
          </p>
        )}
      </section>
    </>
  );
};

export default AboutSection;
