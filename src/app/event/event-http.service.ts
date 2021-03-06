import { AdminHttpResponse } from 'src/app/shared/admin-http-response.int';
import { HttpService } from './../shared/http.service';
import { Event } from 'src/app/shared/event.model';
import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { EventService } from './event.service';
import { map } from 'rxjs/operators';
import { Page } from '../shared/page-model';
import { UtilityService } from '../shared/utility.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class EventHttpService {

  private path = environment.apiUrl;
  private imageServerPath = this.path + 'images/events/';

  showSpinner = false;


    constructor(public http: HttpClient,
                public eventService: EventService,
                public authService: AuthService,
                public utilityService: UtilityService,
                public httpService: HttpService) {}


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

  getAllEvents(param?: string) {
    let url = this.path + 'events';
    if (param === 'coming') {
      url = this.path + 'events/' + param;
    } else if (param === 'past') {
      url = this.path + 'events/' + param;
    }
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

  filterEvents(month: number, year: number, genres?: number[], cities?: string[]) {
    this.showLoadingSpinner();
    const url = this.path + 'events/filter';
    let params;
    if (genres !== undefined && genres !== null && genres.length > 0
      && (cities === null || cities === undefined || cities.length === 0)) {

      params = new HttpParams().set('month', month.toString()).append('year', year.toString()).append('genres', genres.toString());

    } else if (cities !== undefined && cities !== null && cities.length > 0
      && (genres === null || genres === undefined || genres.length === 0)) {

      params = new HttpParams().set('month', month.toString())
      .append('year', year.toString())
      .append('cities', cities.join(',').toLowerCase());

    } else if (genres !== undefined && genres !== null && genres.length > 0
       && cities !== null && cities !== undefined && cities.length > 0) {

      params = new HttpParams().set('month', month.toString()).append('year', year.toString())
      .append('genres', genres.toString()).append('cities', cities.join(',').toLowerCase());

    } else {
      params = new HttpParams().set('month', month.toString()).append('year', year.toString());
    }
    this.http.get<Event[]>(url, { params: params }).subscribe(
      (events: Event[]) => {
        this.eventService.setEvents(events);
        this.hideLoadingSpinner();
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

  getAttendingEventsByUserId(userId: number) {
    const url = this.path + 'user/' + userId + '/events/attending';
    this.http.get<Event[]>(url, { headers: this.authService.getHeaders()}).subscribe(
      (events: Event[]) => {
        this.eventService.setEvents(events);
      },
      (error) => {
        console.log('HttpService error: ', error);
      }
    );
  }

  searchEventsByName(name: string) {
    const url = this.path + 'events/search/' + name;
    this.http.get<Event[]>(url).subscribe(
      (events: Event[]) => {
        this.eventService.setEvents(events);
      },
      (error) => {
        console.log('HttpService error: ', error);
      }
    );
  }

  deleteEvent(id: number) {
    const url = this.path + 'admin/events/' + id;
    this.http.delete(url, {headers: this.authService.getAdminHeaders()}).subscribe(
      (res) => {
        this.eventService.deleteEvent(id);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  updateEvent(id: number, event: Event, image?: File) {
    if (image !== null && image !== undefined) {
      this.httpService.uploadImage(image, 'event', id).then(value => {
        event.image = this.imageServerPath + value;
      });
    }
    const url = this.path + 'admin/events/' + id;
    this.http.put(url, event, {headers: this.authService.getAdminHeaders()}).subscribe(
      (response: AdminHttpResponse) => {
        if (this.eventService.getEvents() !== undefined) {
          this.eventService.updateEvent(id, event);
        }
        alert('SUCCESS: ' + response.responseBody);
      },
      (error: HttpErrorResponse) => {
        alert('ERROR: ' + error.error.responseBody);
        console.log('ERROR: ', error);
      }
    );
  }

  addEvent(event: Event, image?: File) {
    const url = this.path + 'admin/events/';
    this.http.post(url, event, {headers: this.authService.getAdminHeaders()}).subscribe(
      (response: AdminHttpResponse) => {
        event.id = response.objectId;
        if (image !== null && image !== undefined) {
          this.httpService.uploadImage(image, 'event', event.id).then(value => {
            event.image = this.imageServerPath + value;
          });
        }
        if (this.eventService.getEvents() !== undefined) {
          this.eventService.addEvent(event);
        }
        alert('SUCCESS: ' + response.responseBody);
      },
      (error: HttpErrorResponse) => {
        alert('ERROR: ' + error.error.responseBody);
        console.log('ERROR: ', error);
      }
    );
  }

  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }

}
