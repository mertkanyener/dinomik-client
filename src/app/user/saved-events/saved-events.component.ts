import { ActivatedRoute } from '@angular/router';
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
  path: string;

  constructor(public userService: UserService,
              public userHttpService: UserHttpService,
              public utilService: UtilityService,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(
      (url: any) => {
        this.path = url[0].path;
      }
    );
    if (this.path === 'kaydedilenler') {
      this.events = this.utilService.transformObjectArray(this.userService.getUser().savedEvents, 3);
    } else {
      this.events = this.utilService.transformObjectArray(this.userService.getUser().attendingEvents, 3);
    }
    this.subscription = this.userService.userChanged.subscribe(
      (user: User) => {
        console.log('url: ', this.path);
        if (this.path === 'kaydedilenler') {
          this.events = this.utilService.transformObjectArray(user.savedEvents, 3);
        } else {
          this.events = this.utilService.transformObjectArray(user.attendingEvents, 3);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
