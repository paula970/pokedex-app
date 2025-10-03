import React from "react";
import type { Pokemon } from "../../types/pokemon";
import PokemonCard from "../molecules/PokemonCard";

interface PokemonGridProps {
  pokemons: Pokemon[];
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons }) => {
  if (!pokemons.length) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No Pokémon found.</p>;
  }

  return (
    <div className="pokemon-grid">
      <div className="grid">
        {pokemons.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </div>
  );
};

export default PokemonGrid;