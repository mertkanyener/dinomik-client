import {Venue} from './venue.model';
import {Artist} from './artist.model';

export class Event {

  id: number;
  name: string;
  date: Date;
  dateView: string;
  dayOfWeek: string;
  time: string;
  image: string;
  venue: Venue;
  artists: Artist[];
  webLink: string;

  constructor(){}

}
