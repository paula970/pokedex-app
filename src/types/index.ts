// Centralized type definitions

export type SortBy = 'name' | 'id';

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  pokemontypes: PokemonType[];
}

// Detailed Pokemon interface for detail page
export interface PokemonDetail extends Pokemon {
  height: number;
  weight: number;
  pokemonsprites: Array<{
    sprites: string;
  }>;
  pokemonabilities: Array<{
    ability: {
      name: string;
    };
  }>;
  pokemonspecy: {
    pokemonspeciesflavortexts: Array<{
      flavor_text: string;
      version_id: number;
      version: {
        name: string;
      };
    }>;
    generation: {
      name: string;
    };
  };
  pokemonstats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

export interface GetPokemonsData {
  pokemon_list: Pokemon[];
  total_pokemons: {
    aggregate: {
      count: number;
    };
  };
}

// Query for single Pokemon detail
export interface GetPokemonDetailData {
  pokemons: PokemonDetail[];
}

// State types
export interface PokemonState {
  allPokemons: Pokemon[];
  search: string;
  selectedType: string;
  sortBy: SortBy;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

// Action types
export type PokemonAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_POKEMONS'; payload: Pokemon[] }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_SELECTED_TYPE'; payload: string }
  | { type: 'SET_SORT_BY'; payload: SortBy }
  | { type: 'SET_HAS_MORE'; payload: boolean }
  | { type: 'RESET_POKEMONS' };

// Context type
export interface PokemonContextType {
  state: PokemonState;
  dispatch: React.Dispatch<PokemonAction>;
}