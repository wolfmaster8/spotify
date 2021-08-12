import {spotifyApi} from "./axiosInstances/spotifyApi";
import {FetchUserPlaylistsResponse} from "./interfaces/IPlaylistsService";

export default class PlaylistsService {
    public static async fetchUserPlaylists(): Promise<FetchUserPlaylistsResponse>{
        try {
            const { data } = await spotifyApi.get('/me/playlists')
            return Promise.resolve(data)
        }catch (e) {
            console.error(e);
            return Promise.reject()
        }
    }
}