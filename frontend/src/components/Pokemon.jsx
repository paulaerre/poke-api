import { useState, useEffect } from "react";
import { getByUrl } from "../api/api";

function Pokemon({ pokemonData }) {
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = async () => {
    const result = await getByUrl(pokemonData.url);
    setPokemon(result);
  };

  useEffect(() => {
    fetchPokemon();
  }, [pokemonData]);

  return (
    <div className="flex flex-row items-center gap-4 border w-full m-2 p-5">
      {pokemon && (
        <>
          <img src={pokemon.img} />
          <h1 className="text-lg font-bold p-3">
            {pokemon.name} <br />
          </h1>
        </>
      )}
    </div>
  );
}

export default Pokemon;
