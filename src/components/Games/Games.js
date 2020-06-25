import React, { useState, useEffect } from 'react';
import apiKey from '../../api';
import { Link } from 'react-router-dom';


function Games() {
    const [Games, setGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await apiKey.get('https://api.twitch.tv/helix/games/top')
            // console.log('results', results);
            let dataArray = results.data.data;
            // console.log('dataArray', dataArray)
            let finalArray = dataArray.map(game => {
                let newUrl = game.box_art_url
                    .replace('{width}', "250")
                    .replace('{height}', '300');
                // console.log(newUrl);
                game.box_art_url = newUrl;
                return game;
            })
            setGames(finalArray)
        }
        fetchData();
    }, []);



    return (
        <div>
            <h3 className="titreGames">Top Games</h3>
            <div className="flexAccueil">
                {Games.map((game, index) => {
                    return (
                        <div key={index} className="carteGames">
                            <img src={game.box_art_url} alt="jeu profile pic" className="imgCarte" />
                            <div className="cardBodyGames">
                                <h5 className="titreCartesGames"> {game.name}</h5>
                                <Link
                                    className="link"
                                    to={{
                                        pathname: "Game/" + game.name,
                                        state: {
                                            gameID: game.id,
                                        }

                                    }}>
                                    <div className="btnCarte">Watch {game.name}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                })}



            </div>
        </div >
    )
}

export default Games;