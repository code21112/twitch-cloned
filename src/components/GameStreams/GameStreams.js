import React, { useState, useEffect } from 'react';
import apiKey from '../../api.js';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function GameStreams() {


    let { slug } = useParams();

    let location = useLocation();
    console.log("LOCATION", location)
    // console.log(location.state.gameID)

    const [streamData, setStreamData] = useState([]);
    const [viewers, setViewers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {

            const results = await apiKey.get(`https://api.twitch.tv/helix/streams/?game_id=${location.state.gameID}`);
            // console.log("result", results)

            let dataArray = results.data.data

            let finalArray = dataArray.map((stream) => {
                let newURL = stream.thumbnail_url
                    .replace("{width}", "320")
                    .replace("{height}", "180")
                stream.thumbnail_url = newURL
                return stream
            })
            // console.log("finalStreamsArray", finalStreamsArray);

            // Total viewers sum calculus
            let totalViewers = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count;
            }, 0);


            // Get the user id

            let userIDs = dataArray.map((stream) => {
                // let userID = stream.user_id;
                // console.log(userID)
                return stream.user_id
                console.log("userIDs", userIDs)
            })


            // 2nd API call to get user login in order to get good working video player
            let baseUrl = "https://api.twitch.tv/helix/users?";
            let queryParamsUser = "";
            userIDs.map((id) => {
                return (queryParamsUser = queryParamsUser + `id=${id}&`)
            })
            let finalUrl = baseUrl + queryParamsUser

            let getUserLogin = await apiKey.get(finalUrl);
            // console.log("getUserLogin", getUserLogin)
            let userLoginArray = getUserLogin.data.data;
            console.log("userLoginArray", userLoginArray)

            finalArray = dataArray.map((stream) => {
                stream.login = "";
                userLoginArray.forEach(login => {
                    // console.log("stream.login[0]", stream.login[0])

                    if (stream.user_id === login.id) {
                        stream.login = login.login;
                    }
                })
                return stream;
            })

            setViewers(totalViewers);
            setStreamData(finalArray);
        }
        fetchData();
    }, [location.state.gameID]);

    console.log("viewers", viewers)
    console.log("streamData", streamData)

    return (
        <div className="gameStreams">
            <br /><br /><br /><br /><br /><br />
            <h1 className="titleGameStreams">Streams: {slug}</h1>
            <h3 className="subtitleGameStreams">
                <strong className="totalViewersGameStreams">{viewers}</strong> people are watching {slug}
            </h3>

            <div className="flexAccueil">
                {streamData.map((stream, index) => {
                    return (
                        <div key={index} className="cardGameStreams">
                            <img src={stream.thumbnail_url} className="imgCardGameStreams" alt="card image gameStreams" />
                            <div className="cardBodyGameStreams">
                                <h5 className="streamerName">{stream.user_name}</h5>
                                <p className="viewersCard">Viewers: {stream.viewer_count}</p>
                                <Link
                                    className="link"
                                    to={{
                                        pathname: `/Live/${stream.login}`,
                                    }}>
                                    <div className="btnCarte">Watch {stream.user_name} </div>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default GameStreams;