import { useAppDispatch, useAppSelector } from './useRedux';
import { addToFavorites, removeFromFavorites } from '../store/favoritesSlice';
import type { Pokemon } from '../types';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favoritePokemons = useAppSelector(state => state.favorites.favoritePokemons);
  
  const isFavorite = (pokemonId: number): boolean => {
    return favoritePokemons.some(p => p.id === pokemonId);
  };
  
  const toggleFavorite = (pokemon: Pokemon): void => {
    if (isFavorite(pokemon.id)) {
      dispatch(removeFromFavorites(pokemon.id));
    } else {
      dispatch(addToFavorites(pokemon));
    }
  };
  
  return {
    favoritePokemons,
    isFavorite,
    toggleFavorite,
  };
};