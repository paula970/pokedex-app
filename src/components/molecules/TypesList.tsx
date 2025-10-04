import React from 'react';
import TypeBadge from '../atoms/TypeBadge';
import { TYPE_COLORS } from '../../constants/typeColors';

interface TypesListProps {
  types: Array<{ type: { name: string } }>;
  className?: string;
}

// Get color for a specific Pokemon type
const getTypeColor = (typeName: string): string => {
  return TYPE_COLORS[typeName.toLowerCase()] || TYPE_COLORS.normal;
};

const TypesList: React.FC<TypesListProps> = ({ types, className = '' }) => {
  return (
    <div className={`pokemon-types ${className}`}>
      {types.map((typeData, index) => (
        <TypeBadge
          key={index}
          type={typeData.type.name}
          backgroundColor={getTypeColor(typeData.type.name)}
        />
      ))}
    </div>
  );
};

export default TypesList;
