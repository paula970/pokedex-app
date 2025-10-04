import React from "react";
import { usePokemon } from "../hooks/usePokemon";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import SearchBar from "../components/molecules/SearchBar";
import TypeFilter from "../components/molecules/TypeFilter";
import PokemonGrid from "../components/organisms/PokemonGrid";
import MainTemplate from "../components/templates/MainTemplate";
import PokeballIcon from "../assets/icons/pokeball.svg";

const HomePage: React.FC = () => {
  const {
    pokemons,
    loading,
    error,
    loadMore,
    hasMore,
  } = usePokemon();

  const header = (
    <header className="header" style={{
      display: "flex",
      alignItems: "center",
      gap: 24,
      justifyContent: "space-between",
      flexWrap: "wrap"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src={PokeballIcon} alt="Pokeball" className="logo" style={{ width: 40, height: 40 }} />
        <h1 className="title" style={{ margin: 0 }}>Pokédex</h1>
      </div>
      <div style={{ flex: 1, minWidth: 200, maxWidth: 600, display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <SearchBar />
        </div>
        <TypeFilter />
      </div>
    </header>
  );

  // Use infinite scroll hook
  useInfiniteScroll({ hasMore, loading, loadMore });

  let content;
  if (error) {
    content = <p style={{ textAlign: "center", color: "red" }}>Error loading pokemons.</p>;
  } else {
    content = (
      <>
        <PokemonGrid pokemons={pokemons} />
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {!hasMore && <p style={{ textAlign: "center", color: "#666" }}>No more Pokémon to load.</p>}
      </>
    );
  }

  return (
    <MainTemplate
      header={header}
      searchBar={null}
      content={content}
    />
  );
};

export default HomePage;