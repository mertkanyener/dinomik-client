import { VenueHttpService } from './../venue-http.service';
import { EventHttpService } from './../../event/event-http.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { trigger, transition, animate, state, style } from '@angular/animations';
import { VenueService } from '../venue.service';
import { UtilityService } from 'src/app/shared/utility.service';
import { Subscription } from 'rxjs';
import { Venue } from 'src/app/shared/venue.model';
import { EventService } from 'src/app/event/event.service';
import { Page } from 'src/app/shared/page-model';
import { City } from 'src/app/shared/city.interface';
import { Event } from 'src/app/shared/event.model';


@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class VenueListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  subscriptionEvents: Subscription;
  subscriptionScreenSize: Subscription;
  venues: Venue[];
  upcomingEvents = new Array<Event>();
  events = new Array<Event>();
  expandedVenue: Venue;
  displayedColumns = ['name'];
  pageSize = 10;
  dataSource: MatTableDataSource<Venue> = new MatTableDataSource(this.venues);
  zoom = 14;

  screenWidth: number;
  screenSize: string;



  cities: City[] = [
    { value: 'istanbul', viewValue: 'İstanbul' },
    { value: 'ankara', viewValue: 'Ankara' },
    { value: 'izmir', viewValue: 'İzmir' }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public venueService: VenueService,
              public eventService: EventService,
              public eventHttpService: EventHttpService,
              public venueHttpService: VenueHttpService,
              public utilService: UtilityService) {
                this.getScreenSize();
               }

  ngOnInit() {
    this.venueHttpService.getVenues();
    this.subscription = this.venueService.venuesChanged.subscribe(
      (venues: Venue[]) => {
        this.venues = venues;
        this.dataSource.data = venues;
        this.dataSource.filterPredicate = this.utilService.tableFilter();
        this.dataSource.paginator = this.paginator;
      }
    );
    this.subscriptionEvents = this.eventService.eventPageChanged.subscribe(
      (eventPage: Page) => {
        this.upcomingEvents = this.eventService.translateEventDates(eventPage.objects);
        this.setShownEvents();
      }
    );
    this.subscriptionScreenSize = this.utilService.screenSizeChanged.subscribe(
      (screenSize: string) => {
        this.screenSize = screenSize;
        this.setShownEvents();
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionEvents.unsubscribe();
  }

  onClick(venue: Venue) {
    this.eventHttpService.getEventsByVenue(venue.id, 0, 3);
  }

  onCityChange(city: string) {
    this.expandedVenue = null;
    this.venueService.getVenuesByCity(city);
  }

  setShownEvents() {
    if (this.screenSize === 'xs' || this.screenSize === 'sm') {
      this.events = this.upcomingEvents.slice(0, 2);
    } else {
      this.events = this.upcomingEvents;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenWidth = window.innerWidth;
        const size = this.utilService.calculateScreenSize(this.screenWidth);
        if (this.screenSize === undefined) {
          this.screenSize = size;
        }
        this.setShownEvents();
        this.utilService.setScreenSize(size);
  }

}
