import React from "react";
import { Link } from "react-router-dom";
import PokemonImage from "../atoms/PokemonImage";
import type { Pokemon } from "../../types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const paddedId = pokemon.id.toString().padStart(3, "0");
  const nameCapitalized = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card-link">
      <div className="pokemon-card">
        <div className="pokemon-id">{`#${paddedId}`}</div>
        <PokemonImage id={pokemon.id} name={pokemon.name} className="pokemon-img" />
        <div className="pokemon-name">{nameCapitalized}</div>
      </div>
    </Link>
  );
};

export default PokemonCard;