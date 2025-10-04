import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query GetPokemonListAndTotal($limit: Int, $offset: Int, $orderBy: [pokemon_order_by!], $where: pokemon_bool_exp) {
    pokemon_list: pokemon(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      id
      name
      pokemontypes {
        type {
          name
        }
      }
    }
    total_pokemons: pokemon_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;