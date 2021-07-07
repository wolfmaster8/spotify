export default function Login (){
    const redirectUri = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000/authenticate' : `${process.env.URL}/authenticate`;

    const authenticationUrl = `${process.env.SPOTIFY_AUTHENTICATE_URL}?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${redirectUri}`
    return (
        <div>
            <p>asd</p>
            <a href={authenticationUrl}>Login</a>
        </div>
    )
}