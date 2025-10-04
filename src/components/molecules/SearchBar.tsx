import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { usePokemon } from "../../hooks/usePokemon";

const SearchBar: React.FC = () => {
  const { search, setSearch, sortBy, setSortBy } = usePokemon();
  return (
    <div className="search-bar">
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        icon={<span role="img" aria-label="search">🔍</span>}
      />
      <Button
        onClick={() => setSortBy(sortBy === "id" ? "name" : "id")}
        aria-label="Sort"
        title={sortBy === "id" ? "Sort by Name" : "Sort by Number"}
      >
        {sortBy === "id" ? (
          <span style={{ fontWeight: "bold" }}>#</span>
        ) : (
          <span style={{ fontWeight: "bold" }}>A</span>
        )}
      </Button>
    </div>
  );
};

export default SearchBar;