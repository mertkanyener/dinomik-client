import { UserHttpService } from './../user/user-http.service';
import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service';
import { EventHttpService } from './event-http.service';
import { Event } from 'src/app/shared/event.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from './event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {

  event = new Event();
  id: number;
  subscription: Subscription;
  subscriptionEvent: Subscription;
  isMulti = false;

  constructor(public eventService: EventService,
              public eventHttpService: EventHttpService,
              public route: ActivatedRoute,
              public authService: AuthService,
              public userService: UserService,
              public userHttpService: UserHttpService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
    this.eventHttpService.getEvent(this.id);
    this.subscriptionEvent = this.eventService.eventChanged.subscribe(
      (event: Event) => {
        this.event = event;
        if (this.event.artists.length > 1) {
          this.isMulti = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionEvent.unsubscribe();
  }

}
