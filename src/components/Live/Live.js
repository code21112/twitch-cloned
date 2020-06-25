import React, { useState, useEffect } from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { useParams } from 'react-router-dom';
import apiKey from '../../api';

function Live() {
    let { slug } = useParams();

    const [infoGame, setInfoGame] = useState([]);
    const [infosStream, setInfosStream] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const result = await apiKey.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`)
            console.log("result", result)
            console.log("result.data.data", result.data.data)


            if (result.data.data.length === 0) {
                setInfosStream(false)

            } else {

                let gameID = result.data.data.map(gameid => {
                    console.log("dans le map, gameid.game_id", gameid.game_id)
                    return gameid.game_id;
                })

                const resultGameName = await apiKey.get(`https://api.twitch.tv/helix/games?id=${gameID}`)


                let gameName = resultGameName.data.data.map(gameName => {
                    return gameName.name;
                })

                setInfoGame(gameName);
                setInfosStream(result.data.data[0])
            }
        }
        fetchData();

    }, [slug])

    return (

        infosStream ?
            <div className="containerDecale">
                <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
                <div className="contInfos">
                    <div className="titleStream">{infosStream.title}</div>
                    <div className="viewers">Viewers: {infosStream.viewer_count}</div>
                    <div className="infoGame">Streamer: {infosStream.user_name}, &nbsp; Language: {infosStream.language}</div>
                    <div className="gameName">Game: {infoGame}</div>

                </div>
            </div>

            :

            <div className="containerDecale">
                <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
                <div className="contInfos">
                    <div className="titleStream">Streamer currently offline</div>
                </div>
            </div>


    )
}

export default Live;