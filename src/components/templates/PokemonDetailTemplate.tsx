import React from 'react';
import { Link } from 'react-router-dom';
import pokeballBgIcon from '../../assets/icons/pokeball_bg.svg';

interface PokemonDetailTemplateProps {
  pokemonName: string;
  pokemonNumber: string;
  pokemonImageUrl: string;
  backgroundColor: string;
  aboutSection: React.ReactNode;
  statsSection: React.ReactNode;
  className?: string;
}

const PokemonDetailTemplate: React.FC<PokemonDetailTemplateProps> = ({
  pokemonName,
  pokemonNumber,
  pokemonImageUrl,
  backgroundColor,
  aboutSection,
  statsSection,
  className = ''
}) => {
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
            <span className="pokemon-number">#{pokemonNumber}</span>
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
