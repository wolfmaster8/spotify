import {useRouter} from "next/router";
import {useEffect} from "react";
import AuthenticationService from "../services/Authentication/AuthenticationService";

export default function Authenticate(){
    const router  = useRouter()

    useEffect(() => {
        AuthenticationService.setToken().then(() => {
            router.push('/lists')
        }).catch(() => router.push('/'))
    }, [])
    return (
        <div><p>Loading...</p></div>
    )
}