import {Venue} from './venue.model';
import {Artist} from './artist.model';

export class Event {

  id: number;
  name: string;
  date: Date;
  time: string;
  venue: Venue;
  artists: Artist[];
  webLink: string;

  constructor(){}

}
