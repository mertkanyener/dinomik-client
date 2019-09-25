import { UtilityService } from './../shared/utility.service';
import { AuthService } from './../auth/auth.service';
import { VenueService } from 'src/app/venue/venue.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Venue } from '../shared/venue.model';
import { map } from 'rxjs/operators';
import { Page } from '../shared/page-model';
import { Injectable } from '@angular/core';

@Injectable()
export class VenueHttpService {

    private path = 'http://localhost:6060/';

    constructor(private http: HttpClient,
                private venueService: VenueService,
                private authService: AuthService,
                private utilityService: UtilityService) {}

    
getVenues() {
    this.http.get<Venue[]>(this.path + 'venues').subscribe(
      (venues) => {
        this.venueService.setVenues(venues);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  getVenue(id: number) {
    const url = this.path + 'venues/' + id;
    this.http.get<Venue>(url).subscribe(
      (venue: Venue) => {
        this.venueService.setVenue(venue);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  getVenuePage(page: number, size: number) {
    const url = this.path + 'venues/page/' + page + '/size/' + size;
    this.http.get<any>(url).pipe(map(
      (response: HttpResponse<any>) => {
        return this.utilityService.pageResponseMapper(response);
      }
    )).subscribe(
      (venuePage: Page) => {
        this.venueService.setVenuePage(venuePage);
      },
      (error) => {
        console.log('HttpService Error: ', error);
      }
    );
  }

  deleteVenue(id: number) {
    this.http.delete(this.path + 'admin/venues/' + id, this.authService.httpOptions).subscribe(
      (res) => {
        this.venueService.deleteVenue(id);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  updateVenue(id: number, venue: Venue) {
    this.http.put(this.path + 'admin/venues/' + id, venue, this.authService.httpOptions).subscribe(
      (res) => {
        this.venueService.updateVenue(id, venue);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  addVenue(venue: Venue) {
    this.http.post(this.path + 'admin/venues', venue, this.authService.httpOptions).subscribe(
      (res) => {
        this.venueService.addVenue(venue);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

}