import {Artist} from '../shared/artist.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class ArtistService {

  artistsChanged =  new Subject<Artist[]>();
  private artists: Artist[];

  constructor(){}

  getArtists() : Artist[] {
    return this.artists;
  }

  setArtists(artists: Artist[]){
    this.artists = artists;
    this.artistsChanged.next(this.artists.slice());
  }

  getArtist(id: number): Artist {
    return this.artists.find(x => x.id === id);
  }

  deleteArtist(id: number) {
    const index = this.artists.indexOf(this.getArtist(id));
    this.artists.splice(index, 1);
    this.artistsChanged.next(this.artists.slice());
  }

  addArtist(artist: Artist){
    this.artists.push(artist);
    this.artistsChanged.next(this.artists.slice());
  }

  updateArtist(id: number, artist: Artist){
    const index = this.artists.indexOf(this.getArtist(id));
    artist.id = id;
    this.artists[index] = artist;
    this.artistsChanged.next(this.artists.slice());
  }


}
