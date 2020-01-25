import { Genre } from 'src/app/shared/genre.interface';
import {Venue} from './venue.model';
import {Artist} from './artist.model';

export class Event {

  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  dateView: string;
  endDateView: string;
  dayOfWeek: string;
  endDayOfWeek: string;
  time: string;
  image: string;
  venue: Venue;
  artists: Artist[];
  genres: Genre[];
  webLink: string;
  spotifyLink: string;

  constructor(){}

}
