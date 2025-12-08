import React, { memo } from "react";
import { Link } from "react-router-dom";
import PokemonImage from "../atoms/PokemonImage";
import FavoriteToggleButton from "../molecules/FavoriteToggleButton";
import type { Pokemon } from "../../types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const paddedId = pokemon.id.toString().padStart(3, "0");
  const nameCapitalized = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card-link">
      <div className="pokemon-card">
        <div className="pokemon-card-header">
          <FavoriteToggleButton 
             pokemon={pokemon} 
             className="favorite-button" 
          />
          <div className="pokemon-id">{`#${paddedId}`}</div>
        </div>
        <PokemonImage id={pokemon.id} name={pokemon.name} className="pokemon-img" />
        <div className="pokemon-name">{nameCapitalized}</div>
      </div>
    </Link>
  );
};

export default memo(PokemonCard);