import React, { useState, useCallback } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { usePokemon } from "../../hooks/usePokemon";
import { validatePokemonSearch, sanitizeSearchInput } from "../../utils/validation";
import SearchIcon from "../../assets/icons/search.svg";

const SearchBar = () => {
  const { search, setSearch, sortBy, setSortBy } = usePokemon();
  const [validationError, setValidationError] = useState<string>('');
  const [inputValue, setInputValue] = useState(search);

  // Debounced search handler with validation
  const handleSearchChange = useCallback((value: string) => {
    // First, validate the original input to show proper error messages
    const validation = validatePokemonSearch(value);
    
    if (validation.isValid) {
      // If valid, sanitize and use the cleaned value
      const sanitizedValue = sanitizeSearchInput(value);
      setValidationError('');
      setInputValue(sanitizedValue);
      setSearch(sanitizedValue);
    } else {
      // If invalid, show error but still update the input for UX
      setValidationError(validation.error || '');
      
      // Apply basic sanitization for display but don't search
      const sanitizedValue = sanitizeSearchInput(value);
      setInputValue(sanitizedValue);
      // Don't update search when invalid
    }
  }, [setSearch]);

  // Sync input value with external search changes
  React.useEffect(() => {
    setInputValue(search);
  }, [search]);

  return (
    <div className="search-bar">
      <div className="input-wrapper">
        <Input
          placeholder="Search (min 3 chars)"
          value={inputValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          icon={<img src={SearchIcon} alt="search" style={{ width: '1.2rem', height: '1.2rem' }} />}
          style={{
            borderColor: validationError ? '#e74c3c' : undefined,
          }}
          title={validationError || 'Search for Pokemon by name'}
        />
        {validationError && (
          <div className="validation-error" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#e74c3c',
            color: 'white',
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            borderRadius: '0 0 0.25rem 0.25rem',
            zIndex: 10,
          }}>
            {validationError}
          </div>
        )}
      </div>
      <Button
        onClick={() => setSortBy(sortBy === "id" ? "name" : "id")}
        aria-label="Sort"
        title={sortBy === "id" ? "Sort by Name" : "Sort by Number"}
      >
        {sortBy === "id" ? (
          <span style={{ fontWeight: "bold" }}>#</span>
        ) : (
          <span style={{ fontWeight: "bold" }}>A</span>
        )}
      </Button>
    </div>
  );
};

export default SearchBar;