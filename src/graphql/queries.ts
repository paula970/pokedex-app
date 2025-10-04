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

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemons: pokemon(where: {id: {_eq: $id}}) {
      id
      name
      weight
      height
      pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      pokemonabilities {
        ability {
          name
        }
      }
      pokemonspecy {
        pokemonspeciesflavortexts(
          limit: 1
          order_by: {id: desc}
          where: {language_id: {_eq: 9}}
        ) {
          flavor_text
          version_id
          version {
            name
          }
        }
        generation {
          name
        }
      }
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
      pokemontypes {
        type {
          name
        }
      }
    }
  }
`;