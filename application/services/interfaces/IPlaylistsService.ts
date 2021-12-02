export type FetchUserPlaylistsResponse = {
    href: string;
    items: PlaylistsResponse[]
}

export type PlaylistsResponse = {
    id: string;
    collaborative: boolean;
    description: string;
    images: ImagesResponse[];
    name: string;
}

export type ImagesResponse = {
    height: number;
    url: string;
    width: number
}