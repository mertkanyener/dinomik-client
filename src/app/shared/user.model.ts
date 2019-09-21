import { Artist } from './artist.model';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    facebookUser: boolean;
    savedEvents: Event[];
    attendingEvents: Event[];
    likedGenres: string[];
    likedArtists: Artist[];

    constructor(){}
}
