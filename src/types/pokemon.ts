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

export interface GetPokemonsData {
  pokemon_v2_pokemon: Pokemon[];
}