import {Images} from "./Images";

export type Playlist = {
    id: string;
    collaborative: boolean;
    description: string;
    images: Images;
    name: string;
}