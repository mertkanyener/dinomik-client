import { Genre } from './../shared/genre.interface';
import { FormControl } from '@angular/forms';
import { EventHttpService } from './../event/event-http.service';
import { Subscription, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AuthService} from '../auth/auth.service';
import {LoginComponent} from '../auth/login/login.component';
import { EventService } from '../event/event.service';
import { Event } from '../shared/event.model';
import { UtilityService } from '../shared/utility.service';
import { Month } from '../shared/month.interface';
import { City } from '../shared/city.interface';
import { User } from '../shared/user.model';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user/user.service';
import { UserHttpService } from '../user/user-http.service';


const months: Month[] = [
  { value: 0, name: 'Ocak' },
  { value: 1, name: 'Şubat' },
  { value: 2, name: 'Mart' },
  { value: 3, name: 'Nisan' },
  { value: 4, name: 'Mayıs' },
  { value: 5, name: 'Haziran' },
  { value: 6, name: 'Temmuz' },
  { value: 7, name: 'Ağustos' },
  { value: 8, name: 'Eylül' },
  { value: 9, name: 'Ekim' },
  { value: 10, name: 'Kasım' },
  { value: 11, name: 'Aralık' }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  count = 0;
  currentMonth: Month;
  date = new Date();
  monthId: number;
  year: number;
  events: Event[];
  httpEvents: Event[];
  subscription: Subscription;
  subscriptionUser: Subscription;
  subscriptionScreenSize: Subscription;
  user: User;
  screenWidth: number;
  screenSize: string;

  genres = new FormControl();
  cities = new FormControl();
  genreList: Genre[] = [
    {id: 1, name: 'Pop'},
    {id: 2, name: 'Electronic'},
    {id: 3, name: 'Rock'},
    {id: 4, name: 'Metal'},
    {id: 5, name: 'Jazz'},
    {id: 6, name: 'Rap'},
  ];
  cityList: City[] = [
    { value: 'istanbul', viewValue: 'İstanbul' },
    { value: 'ankara', viewValue: 'Ankara' },
    { value: 'izmir', viewValue: 'İzmir' }
  ];
  
  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll() {
  //   // console.log('Scroll top: ', document.body.scrollTop);
  //   // console.log('Document element scrolltop: ', document.documentElement.scrollTop);
  //   // console.log('Offset height: ', document.documentElement.offsetHeight);
  //   // let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.body.offsetHeight ;
  //   // let max = document.body.scrollHeight;
  //   // console.log('pos: ', pos, ' max: ', max)
  //   // // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
  //   // if (pos == max )   {
  //   //   this.count++;
  //   //   console.log('Count: ', this.count);
  //   //   this.httpService.getEventsOnScroll(this.count);
  //   // }

  //   if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
  //     this.count++;
  //     this.httpService.getEventsOnScroll(this.count);
  //   }

  // }

  constructor(public dialog: MatDialog,
              public authService: AuthService,
              public eventHttpService: EventHttpService,
              public eventService: EventService,
              public utilService: UtilityService,
              public userService: UserService,
              public userHttpService: UserHttpService,
              public cookieService: CookieService) { 
                this.getScreenSize();
                }

  ngOnInit() {
    this.monthId = this.date.getMonth();
    this.year = this.date.getFullYear();
    this.currentMonth = months[this.monthId];
    this.eventHttpService.filterEvents(this.currentMonth.value + 1, this.year);

    this.user = this.userService.getUser();
    this.subscriptionUser = this.userService.userChanged.subscribe(
      (user: User) => {
        this.user = user;
        console.log('User: ', this.user);
      }
    );
    this.subscription = this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.httpEvents = events;
        this.events = this.utilService.transformObjectArray(events, this.screenSize);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
    this.subscriptionScreenSize =  this.utilService.screenSizeChanged.subscribe(
      (screenSize: string) => {
        console.log('Screen sizE: ', this.screenSize);
        this.screenSize = screenSize;
        this.events = this.utilService.transformObjectArray(this.httpEvents, screenSize);
      }
    );
    if (!this.authService.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {width: '25rem', height: '35rem', panelClass: 'dino-dialog'});
    }
  }

  onPrevClick(month: number, genres?: number[], cities?: string[]) {
    if (month === 0) {
      this.year -= 1;
      month = 11;
    } else {
      month -= 1;
    }
    this.currentMonth = months[month];
    this.eventHttpService.filterEvents(month + 1, this.year, genres, cities);
  }

  onNextClick(month: number, genres?: number[], cities?: string[] ) {
    if (month === 11) {
      this.year += 1;
      month = 0;
    } else {
      month += 1;
    }
    this.currentMonth = months[month];
    this.eventHttpService.filterEvents(month + 1, this.year, genres, cities );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.subscriptionUser !== undefined) {
      this.subscriptionUser.unsubscribe();
    }
  }

  onLoadMore() {
    this.count++;
   // this.httpService.getEventsOnScroll(this.count);
  }

  onFilter(genres?: number[], cities?: string[]) {
    this.eventHttpService.filterEvents(this.currentMonth.value + 1, this.year, genres, cities);
  }

  hasPrev(): boolean {
    if (this.currentMonth.value === this.monthId) {
      return false;
    } else {
      return true;
    }
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.screenWidth = window.innerWidth;
          const size = this.utilService.calculateScreenSize(this.screenWidth);
          if (this.screenSize === undefined) {
            this.screenSize = size;
          }
          this.utilService.setScreenSize(size);
          console.log('Width: ', this.screenWidth, '  Screen Size: ', this.screenSize);
    }

}
