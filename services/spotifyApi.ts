import axios from "axios";

export const spotifyApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL
});

// axios.defaults.baseURL = process.env.SPOTIFY_API_URL;

export const fetcher = async (url: string) => await spotifyApi.get(url).then(response => response.data)

export const setRequestInterceptor = () => {
    spotifyApi.interceptors.request.use((config) => {
        const token = sessionStorage.getItem('accessToken');
        console.log('stting',token);
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['Content-Type'] = 'application/json';
        return config;
    });
};
