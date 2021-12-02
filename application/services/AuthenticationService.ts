import {setRequestInterceptor} from "./axiosInstances/spotifyApi";

export default class AuthenticationService {
    public static async setToken() {

        const hash = window.location.hash.match(new RegExp('access_token=([^&]*)'));
        console.log(hash);
        if (hash?.length) {
            const accessToken = hash[1];
            console.log(accessToken)
            sessionStorage.setItem('accessToken', accessToken);
            


            setRequestInterceptor();
        }
    }
}

