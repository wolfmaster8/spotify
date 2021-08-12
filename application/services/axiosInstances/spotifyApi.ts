import axios from "axios";

export const spotifyApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL
});


export const setRequestInterceptor = () => {
    spotifyApi.interceptors.request.use((config) => {
        const token = sessionStorage.getItem('accessToken');
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['Content-Type'] = 'application/json';
        return config;
    });
};
