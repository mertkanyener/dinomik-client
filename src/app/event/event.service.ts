import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import { Event } from '../shared/event.model';

@Injectable()
export class EventService {

  eventsChanged = new Subject<Event[]>();
  private events: Event[];


  setEvents(events: Event[]){
    this.events = this.normalizeDates(events);
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

  normalizeDates(events: Event[]): Event[] {
    const months: string[] = [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık'
    ];
    events.forEach(event => {
      const split = event.date.split('-');
      if (split[1] === '01') {
        event.date = split[2] + ' ' + months[0] + ' ' + split[0];
      } else if (split[1] === '02') {
        event.date = split[2] + ' ' + months[1] + ' ' + split[0];
      } else if (split[1] === '03') {
        event.date = split[2] + ' ' + months[2] + ' ' + split[0];
      } else if (split[1] === '04') {
        event.date = split[2] + ' ' + months[3] + ' ' + split[0];
      } else if (split[1] === '05') {
        event.date = split[2] + ' ' + months[4] + ' ' + split[0];
      } else if (split[1] === '06') {
        event.date = split[2] + ' ' + months[5] + ' ' + split[0];
      } else if (split[1] === '07') {
        event.date = split[2] + ' ' + months[6] + ' ' + split[0];
      } else if (split[1] === '08') {
        event.date = split[2] + ' ' + months[7] + ' ' + split[0];
      } else if (split[1] === '09') {
        event.date = split[2] + ' ' + months[8] + ' ' + split[0];
      } else if (split[1] === '10') {
        event.date = split[2] + ' ' + months[9] + ' ' + split[0];
      } else if (split[1] === '11') {
        event.date = split[2] + ' ' + months[10] + ' ' + split[0];
      } else if (split[1] === '12') {
        event.date = split[2] + ' ' + months[11] + ' ' + split[0];
      }
      events[events.indexOf(event)] =  event;
    });
    return events;
  }





}
