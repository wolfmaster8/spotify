import {ReactNode} from "react";
import {setRequestInterceptor} from "../../../application/services/axiosInstances/spotifyApi";
import {useRouter} from "next/router";
import Header from "../Header";

type PrivateLayoutProps = {
    children: ReactNode
}

export default function PrivateLayout({ children}: PrivateLayoutProps): JSX.Element{
    const {push} = useRouter()
    const isLoggedIn = () => {
        /* Fazer lógica para falar se o usuário está ou não autenticado */
        setRequestInterceptor()
        return true;
    }
    if(!isLoggedIn()) push('/login')
    return (
        <main style={{background: '#ccc'}}>
            <Header />
            {children}
        </main>
    )
}