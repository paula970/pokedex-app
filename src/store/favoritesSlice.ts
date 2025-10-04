import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../types';

interface FavoritesState {
  favoritePokemons: Pokemon[];
}

// Helper functions for localStorage
const loadFavoritesFromStorage = (): Pokemon[] => {
  try {
    const stored = localStorage.getItem('pokemon-favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites: Pokemon[]): void => {
  try {
    localStorage.setItem('pokemon-favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

const initialState: FavoritesState = {
  favoritePokemons: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Pokemon>) => {
      const pokemon = action.payload;
      const exists = state.favoritePokemons.find(p => p.id === pokemon.id);
      
      if (!exists) {
        state.favoritePokemons.push(pokemon);
        // Save to localStorage
        saveFavoritesToStorage(state.favoritePokemons);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      state.favoritePokemons = state.favoritePokemons.filter(p => p.id !== pokemonId);
      // Save to localStorage
      saveFavoritesToStorage(state.favoritePokemons);
    },
    clearFavorites: (state) => {
      state.favoritePokemons = [];
      // Save to localStorage
      saveFavoritesToStorage(state.favoritePokemons);
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;