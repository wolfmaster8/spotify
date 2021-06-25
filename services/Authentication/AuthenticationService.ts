import {setRequestInterceptor, spotifyApi} from "../spotifyApi";

class AuthenticationService {
    async setToken() {
        const hash = window.location.hash.match(new RegExp('access_token=([^&]*)'));
        if (hash?.length) {
            const accessToken = hash[1];
            console.log(accessToken)
            sessionStorage.setItem('accessToken', accessToken);
            setRequestInterceptor();
        }
    }
}

export default new AuthenticationService();