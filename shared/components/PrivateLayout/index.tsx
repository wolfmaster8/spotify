import {ReactNode} from "react";
import {setRequestInterceptor} from "../../../application/services/axiosInstances/spotifyApi";
import {useRouter} from "next/router";

type PrivateLayoutProps = {
    children: ReactNode
}

export default function PrivateLayout({ children}: PrivateLayoutProps): JSX.Element{
    const {push} = useRouter()
    const isLoggedIn = () => {
        setRequestInterceptor()
        return true;
    }
    if(!isLoggedIn()) push('/login')
    return (
        <main style={{background: '#ccc'}}>
            {children}
        </main>
    )
}