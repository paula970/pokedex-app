import { createContext } from 'react';
import type { PokemonContextType } from '../types';

// Create context
export const PokemonContext = createContext<PokemonContextType | undefined>(undefined);