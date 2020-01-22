import { AdminHttpResponse } from 'src/app/shared/admin-http-response.int';
import { environment } from './../../environments/environment';
import { HttpService } from './../shared/http.service';
import { UtilityService } from './../shared/utility.service';
import { AuthService } from './../auth/auth.service';
import { VenueService } from 'src/app/venue/venue.service';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Venue } from '../shared/venue.model';
import { map } from 'rxjs/operators';
import { Page } from '../shared/page-model';
import { Injectable } from '@angular/core';

@Injectable()
export class VenueHttpService {

    private imageServerPath = 'http://localhost:9999/images/venues/';
    private path = environment.apiUrl;

    constructor(public http: HttpClient,
                public venueService: VenueService,
                public authService: AuthService,
                public utilityService: UtilityService,
                public httpService: HttpService) {}


getVenues() {
    console.log('Api url: ', this.path);
    this.http.get<Venue[]>(environment.apiUrl + 'venues').subscribe(
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
    this.http.delete(this.path + 'admin/venues/' + id, {headers: this.authService.getAdminHeaders()}).subscribe(
      (res) => {
        this.venueService.deleteVenue(id);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  updateVenue(id: number, venue: Venue) {
    this.http.put(this.path + 'admin/venues/' + id, venue, {headers: this.authService.getAdminHeaders()}).subscribe(
      (response: AdminHttpResponse) => {
        if (this.venueService.getVenues() !== undefined) {
          this.venueService.updateVenue(id, venue);
        }
        alert('SUCCESS: ' + response.responseBody);
      },
      (error: HttpErrorResponse) => {
        alert('ERROR: ' + error .error.responseBody);
        console.log('ERROR: ', error);
      }
    );
  }

  addVenue(venue: Venue) {
    this.http.post(this.path + 'admin/venues', venue, {headers: this.authService.getAdminHeaders()}).subscribe(
      (response: AdminHttpResponse) => {
        venue.id = response.objectId;
        if (this.venueService.getVenues() !== undefined) {
          this.venueService.addVenue(venue);
        }
        alert('SUCCESS: ' + response.responseBody);
      },
      (error: HttpErrorResponse) => {
        alert('ERROR: ' + error.error.responseBody);
        console.log('ERROR: ', error);
      }
    );
  }

}