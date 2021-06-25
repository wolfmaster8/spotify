import {fetcher} from "../services/spotifyApi";
import useSWR from "swr";

export default function Lists(){

    const {data} = useSWR('/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10', fetcher)
    console.log({data});
    if(!data?.items.length){
        return <p>Loading Lists</p>
    }
    return (
        <div><h1>Lists...</h1>
            {data.items.map((item: any) => <p key={item.uri}>{item.name}</p>)}
        </div>
    )
}

/*
export async function getStaticProps() {
    // `getStaticProps` is invoked on the server-side,
    // so this `fetcher` function will be executed on the server-side.
    const posts = await fetcher('/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10')
    return { props: { posts } }
}*/
