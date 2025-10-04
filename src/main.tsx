import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client/react';
import client from './api/apolloClient'
import { PokemonProvider } from './context/PokemonContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </ApolloProvider>
  </StrictMode>
)