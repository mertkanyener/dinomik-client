import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import { Event } from '../shared/event.model';

@Injectable()
export class EventService {

  eventsChanged = new Subject<Event[]>();
  private events: Event[];


  setEvents(events: Event[]){
    this.events = events;
    this.eventsChanged.next(this.events.slice());
  }

  getEvents(): Event[] {
    return this.events;
  }

  getEvent(id: number): Event {
    return this.events.find(x => x.id === id);
  }

  getEventsByArtist(artistId: number, artistName: string): Event[] {
    const events = new Array<Event>();
    this.events.forEach(event => {
      const found = event.artists.find(x => x.id === artistId);
      if (found != null) {
        if (found.name === artistName) {
          found.name = 'Konser';
        }
        events.push(event);
      }
    });
    return events;
  }

  addEvent(event: Event){
    this.events.push(event);
    this.eventsChanged.next(this.events.slice());
  }

  deleteEvent(id: number){
    const index = this.events.indexOf(this.getEvent(id));
    this.events.slice(index, 1);
    this.eventsChanged.next(this.events.slice());
  }

  updateEvent(id: number, event: Event){
    const index = this.events.indexOf(this.getEvent(id));
    event.id = id;
    this.events[index] = event;
    this.eventsChanged.next(this.events.slice());
  }





}
