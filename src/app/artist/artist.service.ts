import {Artist} from '../shared/artist.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import { Page } from '../shared/page-model';

@Injectable()
export class ArtistService {

  artistsChanged =  new Subject<Artist[]>();
  artistPageChanged = new Subject<Page>();
  rowNum: number;
  private artists: Artist[];
  private artistPage: Page;
  private artist: Artist;

  constructor() {}

  getArtists(): Artist[] {
    return this.artists;
  }

  setArtist(artist: Artist) {
    this.artist = artist;
  }

  getArtist(): Artist {
    return this.artist;
  }

  setArtists(artists: Artist[]){
    this.artists = artists;
    this.artistsChanged.next(this.artists.slice());
  }

  setArtistPage(artistPage: Page) {
    this.artistPage = artistPage;
    this.artistPageChanged.next(this.artistPage);
  }

  getArtistById(id: number): Artist {
    return this.artists.find(x => x.id === id);
  }

  deleteArtist(id: number) {
    const index = this.artists.indexOf(this.getArtistById(id));
    this.artists.splice(index, 1);
    this.artistsChanged.next(this.artists.slice());
  }

  addArtist(artist: Artist){
    this.artists.push(artist);
    this.artistsChanged.next(this.artists.slice());
  }

  updateArtist(id: number, artist: Artist){
    const index = this.artists.indexOf(this.getArtistById(id));
    artist.id = id;
    this.artists[index] = artist;
    this.artistsChanged.next(this.artists.slice());
  }


}
