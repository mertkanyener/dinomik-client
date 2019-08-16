import { HttpService } from 'src/app/shared/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Venue } from './../../shared/venue.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Event } from 'src/app/shared/event.model';
import { Subscription } from 'rxjs';
import { VenueService } from '../venue.service';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from 'src/app/event/event.service';

export interface Month {
  value: number;
  name: string;
}

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit, OnDestroy {

  months: Month[] = [
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

  venue: Venue;
  id: number;
  events: Event[];
  avatarStyle: any;
  displayedColumns = ['name', 'date', 'time'];
  dataSource: MatTableDataSource<Event> = new MatTableDataSource(this.events);
  subscription: Subscription;
  subscriptionVenue: Subscription;
  pageSize = 10;
  date = new Date();
  year = this.date.getFullYear();
  searchMonth = this.date.getMonth();
  searchYear = this.year;

  years = [this.year, this.year + 1];


  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private eventService: EventService,
              private httpService: HttpService) { }

  ngOnInit() {
    console.log('Month: ', this.date.getMonth());
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
    if (this.venueService.getVenues() === undefined) {
      this.httpService.getVenue(this.id);
      this.subscriptionVenue = this.venueService.venueChanged.subscribe(
        (venue: Venue) => {
          this.venue = venue;
        }
      );
    } else {
      this.venue = this.venueService.getVenue(this.id);
    }
    this.httpService.getAllEventsByVenue(this.id);
    this.subscription = this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
        console.log('Date: ', this.events[0].date.getMonth());
        this.dataSource.data = this.events;
        this.dataSource.paginator = this.paginator;
      }
    );

    this.avatarStyle = {
      'background-image': this.sanitizer.bypassSecurityTrustUrl(this.venue.image),
      'background-size': 'cover'
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.subscriptionVenue !== undefined) {
      this.subscriptionVenue.unsubscribe();
    }
  }

  onMonthChange(month: number) {
    this.searchMonth = month;
  }

  onYearChange(year: number) {
    this.searchYear = year;
  }

  onSearch() {
    this.httpService.getEventsByVenueAndMonth(this.venue.id, this.searchMonth, this.searchYear);
  }

}
