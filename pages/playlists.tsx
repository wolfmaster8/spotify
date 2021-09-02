import {useEffect, useState} from "react";
import {Playlist} from "../application/models/playlists/Playlist";
import PlaylistsManager from "../application/managers/PlaylistsManager";
import PrivateLayout from "../shared/components/PrivateLayout";
import {Button} from "../shared/components/Button/Button";

export default function Playlists(){
    const [playlists, setPlaylists] = useState<Playlist[]>([])

    useEffect(() => {
        fetchUserPlaylists()
    }, [])

    const fetchUserPlaylists = async () => {
       const userPlaylists = await PlaylistsManager.getUserPlaylists()
        if(userPlaylists.length){
            setPlaylists(userPlaylists)
        }
    }
    return (
        <PrivateLayout>
            <h1>Playlists...</h1>
            <Button dataCy="button" type="primary" text="Hola" />
            {playlists.map((item: any) => <p key={item.uri}>{item.name}</p>)}
        </PrivateLayout>
    )
}