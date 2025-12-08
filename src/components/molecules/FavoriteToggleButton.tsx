import React, { memo } from 'react';
import Button from '../atoms/Button';
import { useFavorites } from '../../hooks/useFavorites';
import type { Pokemon } from '../../types';

interface FavoriteToggleButtonProps {
  pokemon: Pokemon;
  className?: string; // Para permitir estilos extra si es necesario
}

const FavoriteToggleButton = ({ pokemon, className = '' }: FavoriteToggleButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Calculamos el booleano UNA sola vez por render
  const isFav = isFavorite(pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita navegar si está dentro de un Link
    e.stopPropagation(); // Evita disparar eventos del padre
    toggleFavorite(pokemon);
  };

  return (
    <Button 
      onClick={handleFavoriteClick}
      className={`${className} ${isFav ? 'favorite-active' : ''}`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFav ? '⭐' : '☆'}
    </Button>
  );
};

export default memo(FavoriteToggleButton);