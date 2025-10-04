import { useCallback, useMemo, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client/react';
import { GET_POKEMONS } from '../graphql/queries';
import type { GetPokemonsData } from '../types';
import { usePokemonContext } from './usePokemonContext';
import { buildSearchFilter, buildTypeFilter, combineFilters, buildOrderBy } from '../utils/queryHelpers';

const PAGE_SIZE = 20;

export function usePokemon() {
  const { state, dispatch } = usePokemonContext();
  const { allPokemons, search, selectedType, sortBy, loading, error, hasMore } = state;

  // Apollo query variables (memoized)
  const variables = useMemo(() => {
    const orderBy = buildOrderBy(sortBy);
    const searchFilter = buildSearchFilter(search);
    const typeFilter = buildTypeFilter(selectedType);
    const whereClause = combineFilters(searchFilter, typeFilter);
    
    return {
      limit: PAGE_SIZE,
      offset: 0, // Always start from 0 for initial query
      orderBy,
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    };
  }, [sortBy, search, selectedType]);

  const { data, loading: queryLoading, error: queryError } = useQuery<GetPokemonsData>(GET_POKEMONS, {
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network', // Ensure we get fresh data
  });

  // Lazy query for loading more pokemons
  const [loadMorePokemons, { loading: loadMoreLoading }] = useLazyQuery<GetPokemonsData>(GET_POKEMONS, {
    fetchPolicy: 'network-only', // Always fetch fresh data for pagination
  });

  // Update loading and error states
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: queryLoading || loadMoreLoading });
  }, [queryLoading, loadMoreLoading, dispatch]);

  useEffect(() => {
    dispatch({ type: 'SET_ERROR', payload: queryError?.message || null });
  }, [queryError, dispatch]);

  // Add new pokemon data when it arrives
  useEffect(() => {
    if (data && data.pokemon_list) {
      dispatch({ type: 'ADD_POKEMONS', payload: data.pokemon_list });
      
      const totalCount = data.total_pokemons?.aggregate?.count || 0;
      const currentCount = allPokemons.length + data.pokemon_list.length;
      dispatch({ type: 'SET_HAS_MORE', payload: currentCount < totalCount });
    }
  }, [data, dispatch, allPokemons.length]);

  // Lazy load: load more pokemons
  const loadMore = useCallback(async () => {
    if (!hasMore || loading || loadMoreLoading) return;
    
    const currentOffset = allPokemons.length;
    
    try {
      // Use the same filters as the main query
      const orderBy = buildOrderBy(sortBy);
      const searchFilter = buildSearchFilter(search);
      const typeFilter = buildTypeFilter(selectedType);
      const whereClause = combineFilters(searchFilter, typeFilter);

      const { data: moreData } = await loadMorePokemons({
        variables: {
          limit: PAGE_SIZE,
          offset: currentOffset,
          orderBy,
          where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        },
      });
      
      // Manually add the new pokemons to our state
      if (moreData?.pokemon_list) {
        dispatch({ type: 'ADD_POKEMONS', payload: moreData.pokemon_list });
        
        // Update hasMore based on total count
        const totalCount = moreData.total_pokemons?.aggregate?.count || 0;
        const newCount = allPokemons.length + moreData.pokemon_list.length;
        dispatch({ type: 'SET_HAS_MORE', payload: newCount < totalCount });
      }
    } catch (error) {
      console.error('Error loading more pokemons:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error loading more pokémons' });
    }
  }, [loadMorePokemons, hasMore, loading, loadMoreLoading, allPokemons.length, sortBy, search, selectedType, dispatch]);

  // Get unique types from all loaded pokemons
  const availableTypes = useMemo(() => {
    const typeSet = new Set<string>();
    
    allPokemons.forEach(pokemon => {
      pokemon.pokemontypes.forEach(pokemonType => {
        typeSet.add(pokemonType.type.name);
      });
    });
    
    return Array.from(typeSet).sort();
  }, [allPokemons]);

  // No need for local filtering - everything is handled by GraphQL query
  // The data comes already filtered and sorted from the server
  const filteredPokemons = allPokemons;

  // Actions
  const setSearch = useCallback((value: string) => {
    dispatch({ type: 'SET_SEARCH', payload: value });
    // Reset pokemons to search in full database
    dispatch({ type: 'RESET_POKEMONS' });
  }, [dispatch]);

  const setSelectedType = useCallback((type: string) => {
    dispatch({ type: 'SET_SELECTED_TYPE', payload: type });
    // Reset pokemons to filter from full database
    dispatch({ type: 'RESET_POKEMONS' });
  }, [dispatch]);

  const setSortBy = useCallback((sort: 'name' | 'id') => {
    // Only reset if the sort actually changed
    if (sortBy !== sort) {
      dispatch({ type: 'SET_SORT_BY', payload: sort });
      // Reset pokemon list AND offset to start fresh
      dispatch({ type: 'RESET_POKEMONS' });
    }
  }, [dispatch, sortBy]);

  return {
    // Data
    pokemons: filteredPokemons,
    allPokemons,
    availableTypes,
    
    // State
    loading,
    error,
    hasMore,
    search,
    selectedType,
    sortBy,
    
    // Actions
    setSearch,
    setSelectedType,
    setSortBy,
    loadMore,
  };
}