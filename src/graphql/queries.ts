import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query {
    pokemon_v2_pokemon: pokemon(limit: 10, order_by: { name: asc }) {
      id
      name
      pokemontypes {
        type {
          name
        }
      }
    }
  }
`;