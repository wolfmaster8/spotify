import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { EExternalLinks } from "../shared/utils/enums";
import { Button } from "../shared/components/Button/Button";

export default function Home() {
  const redirectUri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/authenticate"
      : `${process.env.URL}/authenticate`;
  const authenticationUrl = `${EExternalLinks.SPOTIFY_AUTH_URL}?client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token`;
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen flex items-center justify-center">
        <a
          href={authenticationUrl}
          className="bg-blue-600 transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed border-2 px-8 border-blue-600 text-blue-100  uppercase text-xs tracking-wider font-semibold py-2 rounded-md"
        >
          <p>Login</p>
        </a>
      </main>
    </div>
  );
}
