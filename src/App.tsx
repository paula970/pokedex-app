import { useQuery } from '@apollo/client/react';
import { GET_POKEMONS } from './graphql/queries';
import type { GetPokemonsData, Pokemon } from './types/pokemon';

function App() {
  const { data, loading, error } = useQuery<GetPokemonsData>(GET_POKEMONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Pokémon List (First 10)</h1>
      <ul>
        {data?.pokemon_v2_pokemon.map((poke: Pokemon) => (
          <li key={poke.id}>
            {poke.name} - Types:{" "}
            {poke.pokemontypes.map((t) => t.type.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;