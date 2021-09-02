import {useState} from "react";

export default function Login() {
    const redirectUri = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000/authenticate' : `${process.env.URL}/authenticate`;
    const [color, setColor] = useState('red')
    const authenticationUrl = `${process.env.SPOTIFY_AUTHENTICATE_URL}?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${redirectUri}`
    return (
        <div>
            <p>asd</p>
            <a data-cy="loginButton" href={authenticationUrl}>Login</a>
            <button data-cy="colorButton"
                    style={{backgroundColor: color}}
                    onClick={() => setColor('blue')}>
                Troca de cor
            </button>
            <ul>
                <li>Jordana</li>
                <li>Roberto</li>
                <li>Felipe</li>
            </ul>
        </div>
    )
}