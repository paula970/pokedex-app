interface PokemonImageProps {
  id: number;
  name: string;
  className?: string;
}

const PokemonImage = ({ id, name, className }: PokemonImageProps) => {
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  return (
    <img
      className={className}
      src={src}
      alt={name}
      loading="lazy"
      width={96}
      height={96}
      style={{ background: 'transparent' }}
    />
  );
};

export default PokemonImage;