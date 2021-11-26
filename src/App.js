import React from "react";
import "./styles.css";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Pokedex from "./components/Pokedex";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import { FavoriteProvider } from "./contexts/favoritesContext";
import Footer from "./components/Footer";
import { Route } from 'react-router-dom';
import Details from './components/Details';
import Swal from 'sweetalert2';

const { useState, useEffect } = React;

const localStorageKey = "favorite_pokemon";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(25, 25 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25));
      setNotFound(false);
    } catch (err) { }
  };




  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    if (!searching) {
      fetchPokemons();
    }
  }, [page]);


  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = updated.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false);
  };



  function onFilter(pokemon) {
    let filteredpokemon = pokemons.filter((p) => p.name === pokemon)

    if (pokemons.length > 0) {
      return filteredpokemon[0]
    } else {
      return (
        Swal.fire({
          title: 'Error!',
          text: 'Your pokemon has escaped, do you want to recapture it?',
          icon: 'error',
          confirmButtonText: 'Yes'
        })
      )

    }
  }
  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons
      }}
    >
      <div>
        <Route path="/" exact component={Navbar} />
        <div className="App">
          <Route path="/" exact render={() => <Searchbar onSearch={onSearch} />} />

          {notFound ? (
            <div className="not-found-text">
              No encontramos tu pokemon, vuelve a intentarlo
            </div>) : <Route path="/" exact render={() =>
              <Pokedex
                loading={loading}
                pokemons={pokemons}
                page={page}
                setPage={setPage}
                total={total}
              />} />}
        </div>
        <Route path={"/pokemon/:pokemon"} render={({ match }) => <Details pokemon={onFilter(match.params.pokemon)} />} />
        <Route path="/" exact component={Footer} />
      </div>
    </FavoriteProvider>
  );
}
