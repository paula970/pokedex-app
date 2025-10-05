import { useCallback, useMemo, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client/react';
import { GET_POKEMONS } from '../graphql/queries';
import type { GetPokemonsData } from '../types';
import { useAppDispatch, useAppSelector } from './useRedux';
import { 
  setLoading,
  setError,
  addPokemons,
  setSearch as setSearchAction,
  setSelectedType as setSelectedTypeAction,
  setSortBy as setSortByAction,
  setShowOnlyFavorites as setShowOnlyFavoritesAction,
  setHasMore,
  resetPokemons
} from '../store/pokemonSlice';
import { buildSearchFilter, buildTypeFilter, combineFilters, buildOrderBy } from '../utils/queryHelpers';

const PAGE_SIZE = 20;

export function usePokemon() {
  const dispatch = useAppDispatch();
  const { allPokemons, search, selectedType, sortBy, showOnlyFavorites, loading, error, hasMore } = useAppSelector(state => state.pokemon);
  const favorites = useAppSelector(state => state.favorites);

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
    dispatch(setLoading(queryLoading || loadMoreLoading));
  }, [queryLoading, loadMoreLoading, dispatch]);

  useEffect(() => {
    dispatch(setError(queryError?.message || null));
  }, [queryError, dispatch]);

  // Add new pokemon data when it arrives
  useEffect(() => {
    if (data && data.pokemon_list) {
      dispatch(addPokemons(data.pokemon_list));
      
      const totalCount = data.total_pokemons?.aggregate?.count || 0;
      const currentCount = allPokemons.length + data.pokemon_list.length;
      dispatch(setHasMore(currentCount < totalCount));
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
        dispatch(addPokemons(moreData.pokemon_list));
        
        // Update hasMore based on total count
        const totalCount = moreData.total_pokemons?.aggregate?.count || 0;
        const newCount = allPokemons.length + moreData.pokemon_list.length;
        dispatch(setHasMore(newCount < totalCount));
      }
    } catch (error) {
      console.error('Error loading more pokemons:', error);
      dispatch(setError('Error loading more pokémons'));
    }
  }, [loadMorePokemons, hasMore, loading, loadMoreLoading, allPokemons.length, sortBy, search, selectedType, dispatch]);

  // Get unique types from all loaded pokemons
  const availableTypes = useMemo(() => {
    const typeSet = new Set<string>();
    
    allPokemons.forEach((pokemon) => {
      pokemon.pokemontypes.forEach((pokemonType) => {
        typeSet.add(pokemonType.type.name);
      });
    });
    
    return Array.from(typeSet).sort();
  }, [allPokemons]);

  // Apply favorites filter locally (GraphQL handles search and type filters)
  const filteredPokemons = useMemo(() => {
    if (!showOnlyFavorites) {
      return allPokemons;
    }
    
    // Filter to show only favorites
    const favoriteIds = favorites.favoritePokemons.map(fav => fav.id);
    return allPokemons.filter(pokemon => favoriteIds.includes(pokemon.id));
  }, [allPokemons, showOnlyFavorites, favorites.favoritePokemons]);

  // Actions
  const setSearch = useCallback((value: string) => {
    dispatch(setSearchAction(value));
    // Reset pokemons to search in full database
    dispatch(resetPokemons());
  }, [dispatch]);

  const setSelectedType = useCallback((type: string) => {
    dispatch(setSelectedTypeAction(type));
    // Reset pokemons to filter from full database
    dispatch(resetPokemons());
  }, [dispatch]);

  const setSortBy = useCallback((sort: 'name' | 'id') => {
    // Only reset if the sort actually changed
    if (sortBy !== sort) {
      dispatch(setSortByAction(sort));
      // Reset pokemon list AND offset to start fresh
      dispatch(resetPokemons());
    }
  }, [dispatch, sortBy]);

  const setShowOnlyFavorites = useCallback((showFavorites: boolean) => {
    dispatch(setShowOnlyFavoritesAction(showFavorites));
  }, [dispatch]);

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
    showOnlyFavorites,
    
    // Actions
    setSearch,
    setSelectedType,
    setSortBy,
    setShowOnlyFavorites,
    loadMore,
  };
}