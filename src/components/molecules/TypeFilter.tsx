import { usePokemon } from '../../hooks/usePokemon';

const TypeFilter = () => {
  /*
selectedType: The value of the currently active filter (e.g., "fire").

setSelectedType: The function to change that filter (e.g., setSelectedType("water")).

availableTypes: The list of all available types (e.g., ["fire", "water", "grass", etc.]) for constructing menu options.
loading: A boolean (true or false) indicating whether the application is loading data.

*/
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