import "./App.css";
import { useEffect, useState } from "react";
import { searchPokemons } from "./api/api";
import PokemonList from "./components/PokemonList";
import Footer from "./components/Footer";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageSize = 3;

  const fetchPokemons = async () => {
    try {
      if(name.length < 3){
        return;
      }
      setLoading(true);
      const { total, results } = await searchPokemons({
        page,
        pageSize,
        name,
      });
      setPokemons(results);
      setTotalPages(new Array(Math.ceil(total / pageSize)).fill().map((_, index) => index + 1))
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
      fetchPokemons();
  }, [page]);

  const renderedPageButtons = totalPages.map((page)=>{
    return <button onClick={() => setPage(page)} className="rounded-lg border bg-gray-300 m-3 p-2" key={page}>{page}</button>;
  })

  const content = pokemons.length ? <PokemonList pokemons={pokemons} /> : null ;

  return (
    <>
      <h1 className="text-3xl font-bold underline p-3">Pokemon Finder</h1>
      <h1 className="text-xl font-bold p-3">
        El que quiere Pokemons, que los busque.
      </h1>
      <input
        className="border m-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={fetchPokemons}
        className="rounded-lg border bg-gray-300 m-3 p-2"
      >
        Buscar
      </button>
      { name.length < 3 &&
      <label>Ingrese al menos 3 letras</label>
      }
      <div className="flex gap-4 mb-4">
        {!loading ? content : <h1>Cargando...</h1>}
      </div>
      <div>
        {renderedPageButtons}
      </div>
      <Footer />
    </>
  );
}

export default App;
