import React, { useEffect, useCallback } from "react";
import { usePokemonList } from "../hooks/usePokemonList"; // Este hook DEBE soportar paginación y loadMore ahora
import SearchBar from "../components/molecules/SearchBar";
import PokemonGrid from "../components/organisms/PokemonGrid";
import MainTemplate from "../components/templates/MainTemplate";
import PokeballIcon from "../assets/icons/pokeball.svg";

const HomePage: React.FC = () => {
  const {
    pokemons,
    loading,
    error,
    search,
    setSearch,
    sortBy,
    setSortBy,
    loadMore,
    hasMore, // Si tu hook soporta saber si hay más para cargar
  } = usePokemonList();

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
      <div style={{ flex: 1, minWidth: 200, maxWidth: 400 }}>
        <SearchBar
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
    </header>
  );

  // Scroll infinito: cuando faltan 200px para el fondo, llama loadMore
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !loading &&
      hasMore // Solo llama si hay más por cargar
    ) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  let content;
  if (error) {
    content = <p style={{ textAlign: "center", color: "red" }}>Error loading pokemons.</p>;
  } else {
    content = (
      <>
        <PokemonGrid pokemons={pokemons} />
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {/* Opcional: mensaje al llegar al final */}
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