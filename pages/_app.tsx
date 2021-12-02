import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type {AppProps} from 'next/app'
import {ThemeProvider} from "styled-components";
import {theme} from "../styles/palette";
import {ProfileProvider} from "../application/contexts/ProfileContext";

function MyApp({Component, pageProps}: AppProps) {

    return (
        <ProfileProvider>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ProfileProvider>)
}

export default MyApp
