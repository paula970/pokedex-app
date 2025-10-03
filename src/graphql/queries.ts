import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query GetPokemonListAndTotal($limit: Int, $offset: Int) {
    pokemon_list: pokemon(limit: $limit, offset: $offset, order_by: {name: asc}) {
      id
      name
      pokemontypes {
        type {
          name
        }
      }
    }
    total_pokemons: pokemon_aggregate {
      aggregate {
        count
      }
    }
  }
`;