import { Event } from 'src/app/shared/event.model';
import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { EventService } from './event.service';
import { map } from 'rxjs/operators';
import { Page } from '../shared/page-model';
import { UtilityService } from '../shared/utility.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EventHttpService {

    private path = 'http://localhost:6060/';

    constructor(private http: HttpClient,
                private eventService: EventService,
                private authService: AuthService,
                private utilityService: UtilityService) {}


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

  filterEvents(month: number, genres?: Array<string>, cities?: Array<string>) {
    const url = this.path + 'events/filter';
    const params = new HttpParams().set('month', month.toString());
    console.log('genres: ', genres);
    console.log('cities: ', cities);
    if (genres !== undefined && genres !== null) {
      params.append('genres', genres.toString());
    }
    if (cities !== undefined && cities !== null) {
      params.append('cities', cities.toString());
    }
    this.http.get<Event[]>(url, { params: params }).subscribe(
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

}