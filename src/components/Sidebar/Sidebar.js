import React, { useState, useEffect } from 'react';
import apiKey from '../../api';
import { Link } from 'react-router-dom';



function Sidebar() {
    const [topStreams, setTopStreams] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await apiKey.get('https://api.twitch.tv/helix/streams')
            // console.log(results);
            let dataArrayStreamers = results.data.data;
            // console.log(dataArrayStreamers)

            let gameIDs = dataArrayStreamers.map(stream => {
                return stream.game_id
            });
            // console.log(gameIDs)

            let userIDs = dataArrayStreamers.map(stream => {
                return stream.user_id
            });
            // console.log(userIDs)

            let baseUrlGames = "https://api.twitch.tv/helix/games?"
            let baseUrlUsers = "https://api.twitch.tv/helix/users?"

            let queryParamsGame = "";
            let queryParamsUser = "";

            gameIDs.map(id => {
                return (queryParamsGame = queryParamsGame + `id=${id}&`)
            });
            userIDs.map(id => {
                return (queryParamsUser = queryParamsUser + `id=${id}&`)
            });

            // URL final
            let urlFinalGames = baseUrlGames + queryParamsGame

            let urlFinalUsers = baseUrlUsers + queryParamsUser
            // console.log(urlFinalGames, urlFinalUsers)

            // OTHER CALLS API
            let gamesNames = await apiKey.get(urlFinalGames);
            let getUsers = await apiKey.get(urlFinalUsers);

            let gamesNamesArray = gamesNames.data.data;
            // console.log("gamesNAmesArray", gamesNamesArray[0])
            let usersArray = getUsers.data.data;
            // console.log("usersArray", usersArray[0])

            // creation du tableau FINAL
            let finalArray = dataArrayStreamers.map(stream => {

                stream.game = "";
                stream.pic = "";
                stream.login = "";

                // console.log(`stream${stream.user_id}`, stream.user_id);
                gamesNamesArray.forEach(name => {
                    usersArray.forEach(user => {
                        if (stream.user_id === user.id && name.id === stream.game_id) {
                            // console.log("le stream", stream)
                            // console.log("le user", user)
                            stream.game = name.name
                            // console.log("Game's name", stream.game)
                            stream.pic = user.profile_image_url
                            // console.log("User's profile image", stream.pic)
                            stream.login = user.login
                            // console.log("User's login", stream.login)
                        }
                    })
                })
                return stream

            })
            setTopStreams(finalArray.slice(0, 6))
        }
        fetchData();
    }, []);
    // console.log("topStreams", topStreams)
    return (
        <div className="sidebar">
            <h5 className="titreSidebar">RECOMMENDED CHANNELS</h5>
            <ul className="listeStream">
                {topStreams.map((stream, index) => {

                    return (
                        <Link
                            key={index}
                            className="link"
                            to={{
                                pathname: `/Live/${stream.login}`,
                            }}>
                            >
                            <li key={index} className="containerFlexSidebar">

                                <img src={stream.pic} alt="profile Streamer" className="profilePicRound" />
                                <div className="streamUser">{stream.user_name}</div>
                                <div className="viewerRight">
                                    <div className="redPoint"></div>
                                    <div>{stream.viewer_count}</div>
                                </div>

                                <div className="gameNameSidebar">{stream.game}</div>

                            </li>
                        </Link>

                    )
                })
                }
            </ul>
        </div>
    )
}

export default Sidebar;



    // Ma VERSION
    // const [topStreams, seTopStreams] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const results = await apiKey.get('https://api.twitch.tv/helix/streams')
    //         // console.log(results);
    //         let dataArrayStreamers = results.data.data;
    //         console.log(dataArrayStreamers)
    //         let finalArrayStreamers = dataArrayStreamers.map(streamer => {
    //             let name = streamer.user_name;
    //             let game_id = streamer.game_id
    //             let counter = streamer.viewer_count
    //             streamer.name = name
    //             streamer.game_id = game_id
    //             streamer.counter = counter
    //             return streamer;
    //         })
    //         seTopStreams(finalArrayStreamers)
    //     }
    //     fetchData();
    // }, []);

    // FIN de Ma VERSION


