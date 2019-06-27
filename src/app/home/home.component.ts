import { Subscription } from 'rxjs';
import { HttpService } from './../shared/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AuthService} from '../auth/auth.service';
import {LoginComponent} from '../auth/login/login.component';
import {DatePipe} from '@angular/common';
import { EventService } from '../event/event.service';
import { Event } from '../shared/event.model';
import { UtilityService } from '../shared/utility.service';

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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  currentMonth: string;
  date = new Date();
  month: number;
  events: Event[];
  subscription: Subscription;
  days = [1, 2, 3, 4, 5, 6, 7];
  rows: number;
  rowArr: Array<number>;
  colArr = new Array<number>(3);

  constructor(public dialog: MatDialog,
              public authService: AuthService,
              public httpService: HttpService,
              public eventService: EventService,
              public utilService: UtilityService) { }

  ngOnInit() {
    this.month = this.date.getMonth();
    this.currentMonth = months[this.month];
    this.httpService.getEvents();
    //this.httpService.getEventsThisMonth();
    this.subscription = this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.rows = Math.floor(events.length / 3 + 1);
        this.events = this.utilService.transformObjectArray(events, 3, this.rows);
        this.rowArr = new Array<number>(this.rows);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
    if (!this.authService.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {width: '20rem', height: '20rem'});
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
