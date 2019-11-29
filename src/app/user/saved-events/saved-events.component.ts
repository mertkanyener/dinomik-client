import { ActivatedRoute } from '@angular/router';
import { UserHttpService } from './../user-http.service';
import { UtilityService } from 'src/app/shared/utility.service';
import { Event } from 'src/app/shared/event.model';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
  userEvents: Event[];
  subscription: Subscription;
  subscriptionScreenSize: Subscription;
  height = window.innerHeight;
  path: string;

  screenWidth: number;
  screenSize: string;

  constructor(public userService: UserService,
              public userHttpService: UserHttpService,
              public utilService: UtilityService,
              public route: ActivatedRoute) {
                this.getScreenSize();
               }

  ngOnInit() {
    this.route.url.subscribe(
      (url: any) => {
        this.path = url[0].path;
      }
    );
    if (this.path === 'kaydedilenler') {
      this.userEvents = this.userService.getUser().savedEvents;
    } else {
      this.userEvents = this.userService.getUser().attendingEvents;
    }
    this.events = this.utilService.transformObjectArray(this.userEvents, this.screenSize);
    this.subscription = this.userService.userChanged.subscribe(
      (user: User) => {
        if (this.path === 'kaydedilenler') {
          this.userEvents = user.savedEvents;
        } else {
          this.userEvents = user.attendingEvents;
        }
      }
    );
    this.subscriptionScreenSize = this.utilService.screenSizeChanged.subscribe(
      (size: string) => {
        this.screenSize = size;
        if (this.events !== undefined) {
          this.events = this.utilService.transformObjectArray(this.userEvents, this.screenSize);
        }
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenWidth = window.innerWidth;
        this.height = window.innerHeight;
        const size = this.utilService.calculateScreenSize(this.screenWidth);
        if (this.screenSize === undefined) {
          this.screenSize = size;
        }
        this.utilService.setScreenSize(size);
        console.log('Width: ', this.screenWidth, '  Screen Size: ', this.screenSize);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
