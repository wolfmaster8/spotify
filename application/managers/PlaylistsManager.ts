import PlaylistsService from "../services/PlaylistsService";
import {FetchUserPlaylistsResponse, PlaylistsResponse} from "../services/interfaces/IPlaylistsService";
import {Playlist} from "../models/playlists/Playlist";
import {Images} from "../models/playlists/Images";

export default  class PlaylistsManager {
    public static async getUserPlaylists(): Promise<Playlist[]>{
        const playlists = await PlaylistsService.fetchUserPlaylists();
        const formattedPlaylists = this.formatUserPlaylists({playlists});
       return Promise.resolve(formattedPlaylists)
    }

    private static formatUserPlaylists({playlists}: {playlists: FetchUserPlaylistsResponse}): Playlist[]{
        return playlists.items.map(playlist => ({
            collaborative: playlist.collaborative,
            id: playlist.id,
            description: playlist.description,
            images: this.getImagesBySize({images: playlist.images}),
            name: playlist.name
        }))
    }

    private static getImagesBySize({images}: Pick<PlaylistsResponse, 'images'>): Images{
        /* logic to organize images */
        return {
            small: '',
            big: '',
            medium: '',
        }
    }
}