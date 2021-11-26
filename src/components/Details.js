import React from 'react'
import { Link } from 'react-router-dom'

export default function Details({ pokemon }) {
    return (
        <>
            <div className="container-details">
                <div className="details-image">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>

                <div className="details-info">

                    <div className="details-header">
                        <h1>{pokemon.name}</h1>
                        <div className="uwu">
                            0{pokemon.id}
                        </div>
                    </div>
                    <table className="default-table">
                        <tbody>
                            <tr>
                                <td>Height:</td>
                                <td>{pokemon.height / 10}m</td>
                            </tr>
                            <tr>
                                <td>Weight:</td>
                                <td>{pokemon.weight / 10}kg</td>
                            </tr>
                            {pokemon.stats.map((stats, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{stats.stat.name}:</td>
                                        <td>{stats.base_stat}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="container-types">
                        <h2>Types:</h2>
                        {pokemon.types.map((type, id) => {
                            return (
                                <div key={id}>
                                    <h2>{type.type.name}</h2>
                                </div>
                            );
                        })}
                    </div>

                </div>
                <div className="btn-exit">
                    <Link to={"/"}>X</Link>
                </div>


            </div>

        </>

    )
}