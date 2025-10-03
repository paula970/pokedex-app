import { useQuery } from '@apollo/client/react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { GET_POKEMONS } from '../graphql/queries';
import type { GetPokemonsData, Pokemon } from '../types/pokemon';

const PAGE_SIZE = 20;
type SortBy = 'name' | 'id';

export function usePokemonList() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('id');
  const [offset, setOffset] = useState(0);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);

  // Apollo query variables (memoized)
  const variables = useMemo(() => ({
    limit: PAGE_SIZE,
    offset,
  }), [offset]);

  const { data, loading, error, fetchMore } = useQuery<GetPokemonsData>(GET_POKEMONS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  // Keep accumulated pokemon list without duplicates
  useEffect(() => {
    if (data && data.pokemon_list) {
      setAllPokemons((prev) => {
        // Add only new pokemons, avoiding duplicate ids
        const newItems = data.pokemon_list.filter(
          (p) => !prev.some((existing) => existing.id === p.id)
        );
        return [...prev, ...newItems];
      });
    }
  }, [data]);

  const totalCount = data?.total_pokemons?.aggregate?.count || 0;
  const hasMore = allPokemons.length < totalCount;

  // Lazy load: load more pokemons
  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    await fetchMore({
      variables: {
        ...variables,
        offset: allPokemons.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
  if (!fetchMoreResult) return prev;
  // Ensure both are arrays
  const prevList = Array.isArray(prev.pokemon_list) ? prev.pokemon_list : [];
  const newList = Array.isArray(fetchMoreResult.pokemon_list) ? fetchMoreResult.pokemon_list : [];
  const merged = [
    ...prevList,
    ...newList.filter(
      (p) => !prevList.some((existing) => existing.id === p.id)
    ),
  ];
  return {
    ...prev,
    pokemon_list: merged,
    total_pokemons: fetchMoreResult.total_pokemons ?? prev.total_pokemons,
  };
}
    });
    setOffset(allPokemons.length + PAGE_SIZE);
  }, [fetchMore, hasMore, allPokemons.length, variables]);

  // Local filtering and sorting
  const filteredPokemons = useMemo(() => {
    let filtered = allPokemons;
    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.id.toString().includes(search)
      );
    }
    if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered = [...filtered].sort((a, b) => a.id - b.id);
    }
    return filtered;
  }, [allPokemons, search, sortBy]);

  const handleSearch = (value: string) => {
    setSearch(value);
    // Don't reset offset or allPokemons here: local filtering
  };

  const handleSort = (sort: SortBy) => {
    setSortBy(sort);
  };

  return {
    loading,
    error,
    pokemons: filteredPokemons,
    search,
    setSearch: handleSearch,
    sortBy,
    setSortBy: handleSort,
    loadMore,
    hasMore,
  };
}