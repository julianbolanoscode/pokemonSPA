import React from "react";
import FavoriteContext from "../contexts/favoritesContext";

const { useContext } = React;

const Navbar = () => {
    const { favoritePokemons } = useContext(FavoriteContext);

    let imgUrl = "https://i.pinimg.com/564x/90/6e/dc/906edc8b6f1b7089442ce99ca0b5a7a2--pokemon-club-pokemon-logo.jpg";

    return (
        <nav>
            <div />
            <div>
                <img src={imgUrl} alt="pokeapi-logo" className="navbar-image" />
            </div>
            <div className="favorites-nav">Pokemons collected: {favoritePokemons.length}</div>
        </nav>
    );
};

export default Navbar;
