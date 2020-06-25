import React, { useState, useEffect } from 'react';
import apiKey from '../../api';
import { Link } from 'react-router-dom';

function TopStreams() {

    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await apiKey.get('https://api.twitch.tv/helix/streams')
            // console.log(results);
            let dataArrayChannels = results.data.data;
            // console.log("dataArrayChannels", dataArrayChannels);

            let gameIDs = dataArrayChannels.map(channel => {
                return channel.game_id
            });
            // console.log("gameIDs", gameIDs)

            let userIDs = dataArrayChannels.map(channel => {
                return channel.user_id
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
            let finalArray = dataArrayChannels.map(channel => {

                channel.game = "";
                channel.pic = "";
                channel.login = "";
                // channel.viewer_count = "";

                // console.log(`stream${stream.user_id}`, stream.user_id);
                gamesNamesArray.forEach(name => {
                    usersArray.forEach(user => {
                        if (channel.user_id === user.id && name.id === channel.game_id) {
                            // console.log("name", name)
                            // console.log("le user", user)
                            channel.game = name.name
                            // console.log("Game's name", channel.game)
                            channel.pic = user.profile_image_url
                            // console.log("User's profile image", channel.pic)
                            channel.login = user.login
                            // console.log("User's login", channel.login)
                            // channel.viewer_count = user.view_count
                        }
                    })
                })
                let newUrl = channel.thumbnail_url
                    .replace("{width}", "320")
                    .replace("{height}", "180")
                channel.thumbnail_url = newUrl

                return channel
            })
            setChannels(finalArray);
        }
        fetchData();
    }, []);

    return (

        <div>
            <h1 className="titleStreams">Top Streams</h1>
            <div className="flexAccueil">
                {channels.map((channel, index) => {
                    return (
                        <div key={index} className="cardStream">
                            <img src={channel.thumbnail_url} className="imgCard" alt="" />
                            <div className="cardBodyStream">
                                <h5 className="titleCardStream">{channel.user_name}</h5>
                                <p className="txtCardStream">Game: {channel.game}</p>
                                <p className="txtCardStreamViewers">Viewers: {channel.viewer_count}</p>
                                <Link
                                    className="link"
                                    to={{
                                        pathname: `/Live/${channel.user_name}`
                                    }}
                                >
                                    <div className="btnCarte">Watch: {channel.user_name}</div>
                                </Link>

                            </div>
                        </div>

                    )

                })}
            </div>

        </div>


        // MA DIV INITIAL
        // <div>
        //     <h2 className="test">Test</h2>
        //     <ul className="listeChannels">
        //         {channels.map((channel, index) => {
        //             return (
        //                 <li key={index} className="containerFlexTopStreams">
        //                     <img src={channel.thumbnail_url} alt="profile Streamer" className="profileChannel" />
        //                     <div className="channelUser">{channel.user_name}</div>
        //                     <div>{channel.viewer_count}</div>

        //                     <div className="viewerRight">
        //                         <div className="redPoint"></div>
        //                         <div>{channel.viewer_count}</div>
        //                     </div>
        //                     <div className="gameNameSidebar">{channel.game}</div>
        //                 </li>
        //             )
        //         })
        //         }
        //     </ul>
        // </div>
        // FIN de Ma DIV INITIAL
    )
}

export default TopStreams;