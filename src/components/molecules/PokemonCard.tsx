import React from "react";
import { Link } from "react-router-dom";
import PokemonImage from "../atoms/PokemonImage";
import Button from "../atoms/Button";
import { useFavorites } from "../../hooks/useFavorites";
import type { Pokemon } from "../../types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const paddedId = pokemon.id.toString().padStart(3, "0");
  const nameCapitalized = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita navegación del Link
    e.stopPropagation();
    toggleFavorite(pokemon);
  };

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card-link">
      <div className="pokemon-card">
        <div className="pokemon-card-header">
          <Button 
            onClick={handleFavoriteClick}
            className={`favorite-button ${isFavorite(pokemon.id) ? 'favorite-active' : ''}`}
            aria-label={isFavorite(pokemon.id) ? 'Remove from favorites' : 'Add to favorites'}
            title={isFavorite(pokemon.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite(pokemon.id) ? '⭐' : '☆'}
          </Button>
          <div className="pokemon-id">{`#${paddedId}`}</div>
        </div>
        <PokemonImage id={pokemon.id} name={pokemon.name} className="pokemon-img" />
        <div className="pokemon-name">{nameCapitalized}</div>
      </div>
    </Link>
  );
};

export default PokemonCard;