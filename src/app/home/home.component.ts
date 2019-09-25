import { EventHttpService } from './../event/event-http.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AuthService} from '../auth/auth.service';
import {LoginComponent} from '../auth/login/login.component';
import { EventService } from '../event/event.service';
import { Event } from '../shared/event.model';
import { UtilityService } from '../shared/utility.service';
import { Month } from '../shared/month.interface';

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
  currentMonth: string;
  date = new Date();
  month: number;
  events: Event[];
  subscription: Subscription;
  subscriptionPage: Subscription;
  rows: number;
  rowArr: Array<number>;
  colArr = new Array<number>(3);

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
              public utilService: UtilityService) { }

  ngOnInit() {
    // if (this.authService.isAuthenticated()) {
      
    // }
    this.month = this.date.getMonth();
    this.currentMonth = months[this.month];
    //this.httpService.getEventsOnScroll(this.count);
    this.subscription = this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.rows = Math.floor(events.length / 3 + 1);
        this.events = this.utilService.transformObjectArray(events, 3, this.rows);
        console.log('Events: ', events);
        this.rowArr = new Array<number>(this.rows);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
    if (!this.authService.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {width: '25rem', height: '35rem', panelClass: 'dino-dialog'});
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLoadMore() {
    this.count++;
   // this.httpService.getEventsOnScroll(this.count);
  }


}
