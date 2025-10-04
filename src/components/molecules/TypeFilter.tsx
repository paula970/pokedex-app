import React from 'react';
import { usePokemon } from '../../hooks/usePokemon';

const TypeFilter: React.FC = () => {
  const { selectedType, setSelectedType, availableTypes, loading } = usePokemon();

  if (loading) {
    return (
      <select disabled>
        <option>Loading types...</option>
      </select>
    );
  }

  return (
    <div className="type-filter">
      <select 
        value={selectedType} 
        onChange={(e) => setSelectedType(e.target.value)}
        className="type-select"
      >
        <option value="">All Types</option>
        {availableTypes.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;