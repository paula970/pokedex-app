import { usePokemon } from '../../hooks/usePokemon';
import Button from '../atoms/Button';

const FavoritesFilter = () => {
  const { showOnlyFavorites, setShowOnlyFavorites } = usePokemon();

  return (
    <Button
      icon="⭐"
      onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
      className={showOnlyFavorites ? 'favorites-active' : 'favorites-inactive'}
      title={showOnlyFavorites ? "Show all Pokémon" : "Show only favorites"}
    >
      Favorites
    </Button>
  );
};

export default FavoritesFilter;