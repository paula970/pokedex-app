import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon, SortBy } from '../types';

interface PokemonState {
  allPokemons: Pokemon[];
  search: string;
  selectedType: string;
  sortBy: SortBy;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: PokemonState = {
  allPokemons: [],
  search: '',
  selectedType: '',
  sortBy: 'name',
  loading: false,
  error: null,
  hasMore: true,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      // Add only new pokemons, avoiding duplicates
      const newPokemons = action.payload.filter(
        (p) => !state.allPokemons.some((existing) => existing.id === p.id)
      );
      state.allPokemons.push(...newPokemons);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    resetPokemons: (state) => {
      state.allPokemons = [];
      state.hasMore = true;
    },
  },
});

export const {
  setLoading,
  setError,
  addPokemons,
  setSearch,
  setSelectedType,
  setSortBy,
  setHasMore,
  resetPokemons,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;