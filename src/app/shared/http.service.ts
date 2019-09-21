import { User } from 'src/app/shared/user.model';
import { UtilityService } from './utility.service';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {ArtistService} from 'src/app/artist/artist.service';
import {EventService} from 'src/app/event/event.service';
import {VenueService} from 'src/app/venue/venue.service';
import {Artist} from './artist.model';
import {Event} from './event.model';
import {Venue} from './venue.model';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';
import { Page } from './page-model';

@Injectable()
export class HttpService {

  private path = 'http://localhost:6060/';

  constructor(private http: HttpClient,
              private artistService: ArtistService,
              private eventService: EventService,
              private venueService: VenueService,
              private authService: AuthService,
              private utilityService: UtilityService) {

  }


  // Artist Operations

  getAllArtists() {
    const url = this.path + 'artists';
    this.http.get<Artist[]>(url).subscribe(
      (artists: Artist[]) => {
        this.artistService.setArtists(artists);
      },
      (error) => {
        console.log('HttpService Error: ', error);
      }
    );
  }

  getArtists(page: number, size: number) {
    const url = this.path + 'artists/page/' + page + '/size/' + size;
    this.http.get<any>(url).pipe(map(
      (response: HttpResponse<any>) => {
        return this.utilityService.pageResponseMapper(response);
      }
    )).subscribe(
      (artistPage: Page) => {
        this.artistService.setArtistPage(artistPage);
      },
      (error) => {
        console.log('HttpService Error: ', error);
      }
    );
  }

  getArtist(id: number) {
    const url = this.path + 'artists/' + id;
    this.http.get<Artist>(url).subscribe(
      (artist: Artist) => {
        this.artistService.setArtist(artist);
      },
      (error) => {
        console.log('HttpService Error: ', error);
      }
    );
  }


  deleteArtist(id: number) {
    this.http.delete(this.path + 'admin/artists/' + id, this.authService.httpOptions).subscribe(
      (res) => {
        this.artistService.deleteArtist(id);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  updateArtist(id: number, artist: Artist) {
    this.http.put(this.path + 'admin/artists/' + id, artist, this.authService.httpOptions).subscribe(
      (res) => {
        this.artistService.updateArtist(id, artist);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  addArtist(artist: Artist) {
    this.http.post(this.path + 'admin/artists', artist, this.authService.httpOptions).subscribe(
      (res) => {
        this.artistService.addArtist(artist);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  // Event Operations

  getEvent(id: number) {
    const url = this.path + 'events/' + id;
    this.http.get<Event>(url).subscribe(
      (event: Event) => {
        this.eventService.setEvent(event);
      },
      (error) => {
        console.log('HttpService error: ', error);
      }
    );
  }

  getAllEvents() {
    const url = this.path + 'events';
    this.http.get<any>(url).subscribe(
      (events: Event[]) => {
        this.eventService.setEvents(events);
      },
      (error) => {
        console.log('HttpService error: ', error);
      }
    );
  }

  getEventsOnScroll(page: number) {
    const url = this.path + 'events/page/' + page + '/size/6';
    this.http.get<any>(url).pipe(map(
      (response: HttpResponse<any>) => {
        return this.utilityService.pageResponseMapper(response);
      }
    )).subscribe(
      (eventPage: Page) => {
        this.eventService.setHomeEvents(eventPage.objects);
      },
      (error) => {
        console.log('HttpService Error: ', error);
      }
    );
  }

  getEventsPage(page: number, size: number) {
    const url = this.path + 'events/page/' + page + '/size/' + size;
    this.http.get<any>(url).pipe(map(
      (response: HttpResponse<any>) => {
        return this.utilityService.pageResponseMapper(response);
      }
    )).subscribe(
      (eventPage: Page) => {
        this.eventService.setEventPage(eventPage);
      },
      (error) => {
        console.log('HttpService Error: ', error);
      }
    );
  }

  getEventsThisMonth(page: number, size: number) {
    const url = this.path + 'events/now/page/' + page + '/size/' + size;
    this.http.get<any>(url).pipe(map(
      (response: HttpResponse<any>) => {
        const events = response['content'];
        return events;
      }
    )).subscribe(
      (events: Event[]) => {
        this.eventService.setEvents(events);
      },
      (error) => {
        console.log('HttpService Error: ', error);
      }
    );
  }

  getEventsByArtist(id: number, page: number, size: number) {
    const url = this.path + 'events/artist/' + id + '/page/' + page + '/size/' + size;
    this.http.get<any>(url).pipe(map(
      (response: HttpResponse<any>) => {
        return this.utilityService.pageResponseMapper(response);
      }
    )).subscribe(
      (pageable: Page) => {
        this.eventService.setEventPage(pageable);
      },
      (error) => {
        console.log('Http error: ', error);
      }
    );
  }

  getEventsByVenue(venueId: number, page: number, size: number) {
    const url = this.path + 'events/venue/' + venueId + '/page/' + page + '/size/' + size;
    this.http.get<any>(url).pipe(map(
      (response: HttpResponse<any>) => {
        return this.utilityService.pageResponseMapper(response);
      }
    )).subscribe(
      (pageable: Page) => {
        this.eventService.setEventPage(pageable);;
      },
      (error) => {
        console.log('HttpService Error: ', error);
      }
    );
  }

  getAllEventsByVenue(venueId: number) {
    const url = this.path + 'events/venue/' + venueId;
    this.http.get<Event[]>(url).subscribe(
      (events: Event[]) => {
        this.eventService.setEvents(events);
      },
      (error) => {
        console.log('HttpService Error: ', error);
      }
    );
  }

  getEventsByVenueAndMonthPage(venueId: number, month: number, year: number, page: number, size: number) {
    const url = this.path + 'events/venue/' + venueId + '/month/' + month + '/year/' + year + '/page/' + page + '/size/' + size;
    this.http.get<any>(url).pipe(map(
      (response: HttpResponse<any>) => {
        const events = response['content'];
        return events;
      }
    )).subscribe(
      (events: Event[]) => {
        this.eventService.setEvents(events);
      },
      (error) => {
        console.log('HttpService error: ', error);
      }
    );
  }

  getEventsByVenueAndMonth(venueId: number, month: number, year: number) {
    const url = this.path + 'events/venue/' + venueId + '/month/' + month + '/year/' + year;
    this.http.get<Event[]>(url).subscribe(
      (events: Event[]) => {
        this.eventService.setEvents(events);
      },
      (error) => {
        console.log('HttpService error: ', error);
      }
    );
  }

  getEventsByDate(year: number, month: number, day: number, page: number, size: number) {
    const url = this.path + 'events/year/' + year + '/month/' + month + '/day/' + day + '/page/' + page + '/size/' + size;
    this.http.get<any>(url).pipe(map(
      (response: HttpResponse<any>) => {
        const events = response['content'];
        return events;
      }
    )).subscribe(
      (events: Event[]) => {
        this.eventService.setEvents(events);
      },
      (error) => {
        console.log('HttpService error: ', error);
      }
    );
  }

  getEventsByCity(city: string, page: number, size: number) {
    const url = this.path + 'events/city/' + city + '/page/' + page + '/size/' + size;
    this.http.get<any>(url).pipe(map(
      (response: HttpResponse<any>) => {
        const events = response['content'];
        return events;
      }
    )).subscribe(
      (events: Event[]) => {
        this.eventService.setEvents(events);
      },
      (error) => {
        console.log('HttpService error: ', error);
      }
    );
  }

  deleteEvent(id: number) {

    this.http.delete(this.path + 'admin/events/' + id, this.authService.httpOptions).subscribe(
      (res) => {
        this.eventService.deleteEvent(id);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  updateEvent(id: number, event: Event) {
    this.http.put(this.path + 'admin/events/' + id, event, this.authService.httpOptions).subscribe(
      (res) => {
        this.eventService.updateEvent(id, event);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  addEvent(event: Event) {
    this.http.post(this.path + 'admin/events/', event, this.authService.httpOptions).subscribe(
      (res) => {
        this.eventService.addEvent(event);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }


  // Venue Operations

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

  // Async validations

  uploadImage(image: File, type: string, name: string): number {

    let status: number;
    const req = new HttpRequest('POST', this.path + 'admin/images/' + type, image, this.authService.httpOptions );
    this.http.request(req).pipe(map(
      (res: HttpResponse<any>) => {
        status = res.status;
        console.log('Status: ', status);
      }
   )).subscribe(
      (resp) => {
        console.log('Image uploaded successfully!');
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );

    return status;
  }


}
