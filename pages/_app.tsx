import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect} from "react";
import {setRequestInterceptor} from "../services/spotifyApi";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('main')
    setRequestInterceptor()
  }, [])
  return <Component {...pageProps} />
}
export default MyApp
