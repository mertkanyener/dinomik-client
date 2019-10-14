import { UserHttpService } from './../user-http.service';
import { UtilityService } from 'src/app/shared/utility.service';
import { Event } from 'src/app/shared/event.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/shared/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-saved-events',
  templateUrl: './saved-events.component.html',
  styleUrls: ['./saved-events.component.css']
})
export class SavedEventsComponent implements OnInit, OnDestroy {

  events: Event[];
  subscription: Subscription;
  height = window.innerHeight;

  constructor(public userService: UserService,
              public userHttpService: UserHttpService,
              public utilService: UtilityService) { }

  ngOnInit() {
    this.events = this.utilService.transformObjectArray(this.userService.getUser().savedEvents, 3);
    this.subscription = this.userService.userChanged.subscribe(
      (user: User) => {
        this.events = this.utilService.transformObjectArray(user.savedEvents, 3);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
