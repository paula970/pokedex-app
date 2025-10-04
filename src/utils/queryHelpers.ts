// Utility functions for GraphQL filtering

export function buildSearchFilter(search: string) {
  if (!search.trim()) return {};
  
  return {
    _or: [
      { name: { _ilike: `%${search}%` } },
      { id: { _eq: parseInt(search) || 0 } }
    ]
  };
}

export function buildTypeFilter(selectedType: string) {
  if (!selectedType) return {};
  
  return {
    pokemontypes: {
      type: {
        name: { _eq: selectedType }
      }
    }
  };
}

export function combineFilters(searchFilter: Record<string, unknown>, typeFilter: Record<string, unknown>) {
  const hasSearchFilter = Object.keys(searchFilter).length > 0;
  const hasTypeFilter = Object.keys(typeFilter).length > 0;
  
  if (hasSearchFilter && hasTypeFilter) {
    return { _and: [searchFilter, typeFilter] };
  }
  
  if (hasSearchFilter) return searchFilter;
  if (hasTypeFilter) return typeFilter;
  
  return {};
}

import type { SortBy } from '../types';

export function buildOrderBy(sortBy: SortBy) {
  return sortBy === 'name' 
    ? [{ name: 'asc' }] 
    : [{ id: 'asc' }];
}