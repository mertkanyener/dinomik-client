import { AuthService } from './../auth/auth.service';
import { EventHttpService } from './../event/event-http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/shared/event.model';
import { EventService } from 'src/app/event/event.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { UserHttpService } from '../user/user-http.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  user: User;
  events: Event[];
  eventName: string;
  subscription: Subscription;
  subscriptionUser: Subscription;
  height = window.innerHeight;

  constructor(public eventService: EventService,
              public route: ActivatedRoute,
              public eventHttpService: EventHttpService,
              public authService: AuthService,
              public userService: UserService,
              public userHttpService: UserHttpService) { }

  ngOnInit() {
    this.subscriptionUser = this.userService.userChanged.subscribe(
      (user: User) => {
        this.user = user;
      }
    );

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
    if (this.subscriptionUser !== undefined) {
      this.subscriptionUser.unsubscribe();
    }
  }

}
