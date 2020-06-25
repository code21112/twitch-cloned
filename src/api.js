import axios from 'axios';

let apiKey = axios.create({
    headers: {
        // 'Client-ID': 'hdv6fccrckrt2zr4hxs4h6bs4a84n4'
        'Client-ID': '548ccroa2qu4rij1dihped9amfirrg',
        'Authorization': 'Bearer 3z047pla3ks5zxjyduscj4frf6c2e5'
    }
})

/*
    CLIENT_ID = 'VOTRE_CLIENT_ID';
    REDIRECT = 'http://127.0.0.1/';

    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

    LIEN REMPLI = https://id.twitch.tv/oauth2/authorize?client_id=548ccroa2qu4rij1dihped9amfirrg&redirect_uri=http://127.0.0.1/&response_type=token

*/
export default apiKey;