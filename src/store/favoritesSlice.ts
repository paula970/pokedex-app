import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../types';

interface FavoritesState {
  favoritePokemons: Pokemon[];
}

const initialState: FavoritesState = {
  favoritePokemons: [],
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
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      state.favoritePokemons = state.favoritePokemons.filter(p => p.id !== pokemonId);
    },
    clearFavorites: (state) => {
      state.favoritePokemons = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;