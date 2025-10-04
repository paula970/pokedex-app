import { useReducer } from 'react';
import type { ReactNode } from 'react';
import type { PokemonState, PokemonAction } from '../types';
import { PokemonContext } from './index';

// Initial state
const initialState: PokemonState = {
  allPokemons: [],
  search: '',
  selectedType: '',
  sortBy: 'name',
  loading: false,
  error: null,
  hasMore: true,
};

// Reducer function
function pokemonReducer(state: PokemonState, action: PokemonAction): PokemonState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'ADD_POKEMONS': {
      // Add only new pokemons, avoiding duplicates
      const newPokemons = action.payload.filter(
        (p) => !state.allPokemons.some((existing) => existing.id === p.id)
      );
      return { 
        ...state, 
        allPokemons: [...state.allPokemons, ...newPokemons] 
      };
    }
    
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    
    case 'SET_SELECTED_TYPE':
      return { ...state, selectedType: action.payload };
    
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    
    case 'RESET_POKEMONS':
      return { ...state, allPokemons: [], hasMore: true };
    
    default:
      return state;
  }
}



// Provider component
interface PokemonProviderProps {
  children: ReactNode;
}

export function PokemonProvider({ children }: PokemonProviderProps) {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
}

