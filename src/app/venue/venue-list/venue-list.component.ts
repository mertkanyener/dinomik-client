import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { trigger, transition, animate, state, style } from '@angular/animations';
import { VenueService } from '../venue.service';
import { HttpService } from 'src/app/shared/http.service';
import { UtilityService } from 'src/app/shared/utility.service';
import { Subscription } from 'rxjs';
import { Venue } from 'src/app/shared/venue.model';
import { EventService } from 'src/app/event/event.service';
import { Page } from 'src/app/shared/page-model';


export interface City {
  value: string;
  viewValue: string;
}

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
  venues: Venue[];
  events = new Array<Event>();
  expandedVenue: Venue;
  displayedColumns = ['name'];
  pageSize = 10;
  dataSource: MatTableDataSource<Venue> = new MatTableDataSource(this.venues);
  zoom = 14;
  state = 'collapsed';

  cities: City[] = [
    { value: 'istanbul', viewValue: 'İstanbul' },
    { value: 'ankara', viewValue: 'Ankara' },
    { value: 'izmir', viewValue: 'İzmir' }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private venueService: VenueService,
              private eventService: EventService,
              private http: HttpService,
              private utilService: UtilityService) {
               }

  ngOnInit() {
    this.http.getVenues();
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
        this.events = eventPage.objects;
        console.log('Events: ', this.events);
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionEvents.unsubscribe();
  }

  onClick(venue: Venue) {
    this.http.getEventsByVenue(venue.id, 0, 3);
  }

  onCityChange(city: string) {
    this.expandedVenue = null;
    this.venueService.getVenuesByCity(city);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
