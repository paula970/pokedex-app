import React from 'react';
import { Link } from 'react-router-dom';
import pokeballBgIcon from '../../assets/icons/pokeball_bg.svg';
import FavoriteToggleButton from "../molecules/FavoriteToggleButton";

// Generation icons
import generationI from '../../assets/icons/generation-i.svg';
import generationII from '../../assets/icons/generation-ii.svg';
import generationIII from '../../assets/icons/generation-iii.svg';
import generationIV from '../../assets/icons/generation-iv.svg';
import generationV from '../../assets/icons/generation-v.svg';
import generationVI from '../../assets/icons/generation-vi.svg';
import generationVII from '../../assets/icons/generation-vii.svg';
import generationVIII from '../../assets/icons/generation-viii.svg';
import generationIX from '../../assets/icons/generation-ix.svg';

const generationIcons: Record<string, string> = {
  'generation-i': generationI,
  'generation-ii': generationII,
  'generation-iii': generationIII,
  'generation-iv': generationIV,
  'generation-v': generationV,
  'generation-vi': generationVI,
  'generation-vii': generationVII,
  'generation-viii': generationVIII,
  'generation-ix': generationIX,
};

import type { Pokemon } from '../../types';

interface PokemonDetailTemplateProps {
  pokemonName: string;
  pokemonNumber: string;
  pokemonImageUrl: string;
  backgroundColor: string;
  generationName?: string;
  pokemon: Pokemon;
  aboutSection: React.ReactNode;
  statsSection: React.ReactNode;
  className?: string;
}

const PokemonDetailTemplate = ({
  pokemonName,
  pokemonNumber,
  pokemonImageUrl,
  backgroundColor,
  generationName,
  pokemon,
  aboutSection,
  statsSection,
  className = ''
}: PokemonDetailTemplateProps) => {
  
  return (
    <div className={`pokemon-detail-page ${className}`}>
      <div className="pokemon-detail-container">
        {/* Top Section - Colored Background */}
        <div 
          className="pokemon-top-section"
          style={{ backgroundColor }}
        >
          {/* Pokeball Background Icon */}
          <div className="pokeball-background">
            <img src={pokeballBgIcon} alt="" className="pokeball-bg-icon" />
          </div>
          
          {/* Header */}
          <header className="pokemon-detail-header">
            <Link to="/" className="back-button">
              <span className="back-arrow">←</span>
            </Link>
            <h1 className="pokemon-name">{pokemonName}</h1>
            <div className="pokemon-meta">
              <div className="pokemon-info">
                <span className="pokemon-number">#{pokemonNumber}</span>
                {generationName && (
                  <img 
                    src={generationIcons[generationName] || generationIcons['generation-i']}
                    alt={`Generation ${generationName}`}
                    className="pokemon-generation generation-icon"
                  />
                )}
              </div>
              <FavoriteToggleButton 
                pokemon={pokemon} 
                className="detail-favorite-button"
              />
            </div>
          </header>

          {/* Pokemon Image */}
          <div className="pokemon-image-container">
            <img 
              src={pokemonImageUrl} 
              alt={pokemonName}
              className="pokemon-detail-image"
            />
          </div>
        </div>

        {/* Bottom Section - White Background with organisms */}
        <div className="pokemon-info-card">
          {aboutSection}
          
          {statsSection}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailTemplate;
