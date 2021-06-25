import axios from "axios";



export const spotifyAuthenticate = axios.create({
    baseURL: process.env.SPOTIFY_AUTHENTICATE_URL
})

