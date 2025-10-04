import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <header>
        <Link to="/">← Back to Pokédex</Link>
      </header>
      <main>
        <h1>Pokemon Detail Page</h1>
        <p>Pokemon ID: {id}</p>
        <p>Esta es la página de detalle del Pokemon. Solo configuración básica del router.</p>
      </main>
    </div>
  );
};

export default PokemonDetailPage;