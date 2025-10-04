import { useQuery } from '@apollo/client/react';
import { GET_POKEMON_DETAIL } from '../graphql/queries';
import type { GetPokemonDetailData } from '../types';

export function usePokemonDetail(id: number) {
  const { data, loading, error } = useQuery<GetPokemonDetailData>(GET_POKEMON_DETAIL, {
    variables: { id },
    skip: !id, // Skip query if no ID provided
  });

  return {
    pokemon: data?.pokemons?.[0], // Get first (and only) pokemon from array
    loading,
    error,
  };
}