import React, { useState, useEffect } from 'react';
import apiKey from '../../api';
import { Link, useParams } from 'react-router-dom';
import Error from '../Error/Error';

function Result() {

    let { slug } = useParams();
    console.log(slug)


    const [result, setResult] = useState(true);
    const [streamerInfos, setStreamerInfos] = useState([]);

    let cleanSearch = slug.replace(/ /g, '');
    // console.log(cleanSearch)

    useEffect(() => {
        const fetchData = async () => {
            // let baseUrl = "https://api.twitch.tv/helix/search/channels?";

            const result = await apiKey.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`)
            console.log("result", result)
            if (result.data.data.length === 0) {
                setResult(false)
            }
            setStreamerInfos(result.data.data);
        }
        fetchData();
    }, [cleanSearch]);


    return (
        result ?
            <div>
                <div className="containerDecalResult">
                    <h4>Result:</h4>
                    {streamerInfos.map((streamer, index) => {
                        return (
                            <div key={index} className="cardResult">
                                <img src={streamer.profile_image_url} alt="image streamer" className="imgCard" />
                                <div className="cardBodyResult">
                                    <h5 className="titleCardStream">{streamer.display_name}</h5>

                                    <div className="txtResult">
                                        {streamer.description}
                                    </div>
                                    <Link
                                        className="link"
                                        to={{
                                            pathname: `/Live/${streamer.login}`,
                                            // state: {
                                            //     gameID: game.id,
                                            // }

                                        }}>
                                        <div className="btnCarte btnResult">Watch {streamer.display_name}</div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            :
            < Error />
    )
}
export default Result;



// ESSAI DE useEffect

// useEffect(() => {
//     const fetchData = async () => {


// FIRST CALL API => streamers
// let baseUrl = "https://api.twitch.tv/helix/search/channels?";
// let queryParamsInput = `query=${slug}`;
// let finalUrl = baseUrl + queryParamsInput;

// let getStreamer = await apiKey.get(finalUrl);
// console.log("getUserLogin", getUserLogin)
//         let streamersFoundArray = getStreamer.data.data;
//         console.log("streamers", streamersFoundArray)


//         let streamersFoundInfos = streamersFoundArray.map(streamer => {
//             let queryParamsGame = "";
//             let queryParamsUser = "";
//             streamer.id = streamer.id;
//             streamer.gameID = streamer.game_id;
//             streamer.name = streamer.display_name;
//             return streamer
//         });
//         console.log("streamersFoundInfos", streamersFoundInfos)

//         setStreamersInfos(streamersFoundInfos);
//     }
//     fetchData();
// }, []);


// FIN DE ESSAI DE useEffect



// return (
//     <div className="result">
{/* TEST de CARDS */ }
// <div>
//     <div className="flexAccueil">
//         {streamersInfos.map((streamer, index) => {
//             console.log(streamer)
//             return (
//                 <div key={index} className="cardStream">
//                     <img src={streamer.thumbnail_url} className="imgCard" alt="" />
//                     <div className="cardBodyStream">
//                         <h5 className="titleCardStream">{streamer.display_name}</h5>
//                         <p className="txtCardStream">Game: {streamer.game}</p>
//                         <p className="txtCardStreamViewers">Viewers: {streamer.viewer_count}</p>
//                         <Link
//                             className="link"
//                             to={{
//                                 pathname: `/Live/${streamer.user_name}`
//                             }}
//                         >
//                             <div className="btnCarte">Watch: {streamer.user_name}</div>
//                         </Link>

//                     </div>
//                 </div>

//             )

//         })}
//     </div>
// </div>
{/* FIN de test de cards */ }


//     </div>

// )
// }
// export default Result;