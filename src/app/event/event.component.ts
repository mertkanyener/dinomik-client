import { Event } from 'src/app/shared/event.model';
import { HttpService } from './../shared/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event = new Event();
  id: number;
  subscription: Subscription;
  subscriptionEvent: Subscription;

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private httpService: HttpService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
    if (this.eventService.getEvents() === undefined) {
      this.httpService.getEvent(this.id);
      this.subscriptionEvent = this.eventService.eventChanged.subscribe(
        (event: Event) => {
          this.event = event;
        }
      );
    } else {
      this.event = this.eventService.getEvent(this.id);
    }
  }

}
