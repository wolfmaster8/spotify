import {useRouter} from "next/router";
import {useEffect} from "react";
import AuthenticationService from "../application/services/AuthenticationService";

export default function Authenticate(){
    const router  = useRouter()

    useEffect(() => {
        AuthenticationService.setToken().then(() => {
            router.push('/playlists')
        }).catch(() => router.push('/'))
    }, [])
    return (
        <div><p>Loading...</p></div>
    )
}