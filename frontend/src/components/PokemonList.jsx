import Pokemon from "./Pokemon";
function PokemonList({ pokemons }) {
  const renderedPokemons = pokemons.map((pokemon) => {
    return <Pokemon key={pokemon.name} pokemonData={pokemon} />;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold underline p-3">
        Resultados de la búsqueda
      </h1>
      {renderedPokemons}
    </div>
  );
}

export default PokemonList;
