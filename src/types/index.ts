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