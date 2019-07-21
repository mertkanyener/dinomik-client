import { Artist } from './artist.model';

export class ArtistPage {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    artists: Artist[];

    constructor() {}
}
