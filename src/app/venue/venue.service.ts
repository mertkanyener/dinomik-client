import {Venue} from '../shared/venue.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class VenueService {

  venuesChanged = new Subject<Venue[]>();
  private venues: Venue[];


  constructor(){}

  setVenues(venues: Venue[]){
    this.venues = venues;
    this.venuesChanged.next(this.venues.slice());
  }

  getVenues(): Venue[]{
    return this.venues;
  }

  getVenue(id: number): Venue {
    return this.venues.find(x => x.id === id);
  }

  addVenue(venue: Venue){
    this.venues.push(venue);
    this.venuesChanged.next(this.venues.slice());
  }

  deleteVenue(id: number){
    const index = this.venues.indexOf(this.getVenue(id));
    this.venues.splice(index, 1);
    this.venuesChanged.next(this.venues.slice());
  }

  updateVenue(id: number, venue: Venue){
    const index = this.venues.indexOf(this.getVenue(id));
    venue.id = id;
    this.venues[index] = venue;
    this.venuesChanged.next(this.venues.slice());
  }





}
