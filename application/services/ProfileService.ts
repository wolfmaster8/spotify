import {spotifyApi} from "./axiosInstances/spotifyApi";
import {Profile} from "../models/user/Profile";

export default class ProfileService{
    public static async getProfile(): Promise<Profile>{
        try {
            const {data} = await spotifyApi.get('/me')
            console.log(data);
            return Promise.resolve(data)
        }catch (e) {
            return Promise.reject()
        }
    }
}