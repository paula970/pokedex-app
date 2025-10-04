import React from 'react';
import { useParams } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { TYPE_COLORS } from '../constants/typeColors';
import PokemonDetailTemplate from '../components/templates/PokemonDetailTemplate';
import AboutSection from '../components/organisms/AboutSection';
import StatsSection from '../components/organisms/StatsSection';

// Get color for Pokemon type (uses first type if multiple)
const getTypeColor = (types: Array<{ type: { name: string } }>): string => {
  if (!types || types.length === 0) return TYPE_COLORS.normal;
  
  const primaryType = types[0].type.name.toLowerCase();
  return TYPE_COLORS[primaryType] || TYPE_COLORS.normal;
};

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pokemonId = id ? parseInt(id, 10) : 0;
  const { pokemon, loading, error } = usePokemonDetail(pokemonId);

  if (loading) {
    return (
      <div className="pokemon-detail-page">
        <div className="loading">Loading Pokemon details...</div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="pokemon-detail-page">
        <div className="error">Pokemon not found</div>
      </div>
    );
  }

  const backgroundColor = getTypeColor(pokemon.pokemontypes);
  const pokemonNumber = pokemon.id.toString().padStart(3, '0');
  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const pokemonImageUrl = pokemon.pokemonsprites[0]?.sprites;
  const description = pokemon.pokemonspecy?.pokemonspeciesflavortexts?.[0]?.flavor_text;
  const generationName = pokemon.pokemonspecy?.generation?.name;

  // Create About Section
  const aboutSection = (
    <AboutSection
      types={pokemon.pokemontypes}
      weight={pokemon.weight}
      height={pokemon.height}
      abilities={pokemon.pokemonabilities}
      description={description}
      titleColor={backgroundColor}
    />
  );

  // Create Stats Section  
  const statsSection = (
    <StatsSection
      stats={pokemon.pokemonstats}
      titleColor={backgroundColor}
      backgroundColor={backgroundColor}
    />
  );

  return (
    <PokemonDetailTemplate
      pokemonName={pokemonName}
      pokemonNumber={pokemonNumber}
      pokemonImageUrl={pokemonImageUrl}
      backgroundColor={backgroundColor}
      generationName={generationName}
      aboutSection={aboutSection}
      statsSection={statsSection}
    />
  );
};

export default PokemonDetailPage;