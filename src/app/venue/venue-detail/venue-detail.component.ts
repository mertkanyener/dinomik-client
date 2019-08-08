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

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit, OnDestroy {

  venue: Venue;
  id: number;
  events: Event[];
  avatarStyle: any;
  displayedColumns = ['name', 'date', 'time'];
  dataSource: MatTableDataSource<Event> = new MatTableDataSource(this.events);
  subscription: Subscription;
  subscriptionVenue: Subscription;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private venueService: VenueService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private eventService: EventService,
              private httpService: HttpService) { }

  ngOnInit() {
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

}
