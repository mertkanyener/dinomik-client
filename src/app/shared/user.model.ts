import { Event } from 'src/app/shared/event.model';
import { Artist } from './artist.model';
import { Genre } from './genre.interface';
import { Gender } from './gender.int';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: string;
    gender: Gender;
    birthDate: string;
    facebookUser: boolean;
    savedEvents: Event[];
    attendingEvents: Event[];
    likedGenres: Genre[];
    likedArtists: Artist[];
    friends: number[];

    constructor(){}
}
