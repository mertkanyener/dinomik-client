import { Page } from 'src/app/shared/page-model';
import {Venue} from '../shared/venue.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class VenueService {

  venuePageChanged = new Subject<Page>();
  venuesChanged = new Subject<Venue[]>();
  private venuePage: Page;
  private venues: Venue[];

  constructor() {}

  setVenuePage(venuePage: Page) {
    this.venuePage = venuePage;
    this.venuePageChanged.next(this.venuePage);
  }

  setVenues(venues: Venue[]) {
    this.venues = venues;
    this.venuesChanged.next(this.venues.slice());
  }

  getVenues(): Venue[] {
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

  getVenuesByCity(city: string): Venue[] {
    let venues: Venue[];
    this.venues.forEach( venue => {
      if (venue.city === city) {
        venues.push(venue);
      }
    });
    return venues;
  }





}
