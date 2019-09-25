import { EventHttpService } from './../event/event-http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/shared/event.model';
import { EventService } from 'src/app/event/event.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  events: Event[];
  eventName: string;
  subscription: Subscription;

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private eventHttpService: EventHttpService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.eventName = params['name'];
        this.eventHttpService.searchEventsByName(this.eventName);
      }
    );

    this.subscription = this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
