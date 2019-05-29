import { MatTableDataSource, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { trigger, transition, animate, state, style } from '@angular/animations';
import { VenueService } from '../venue.service';
import { HttpService } from 'src/app/shared/http.service';
import { UtilityService } from 'src/app/shared/utility.service';
import { Subscription } from 'rxjs';
import { Venue } from 'src/app/shared/venue.model';


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
  venues: Venue[];
  expandedVenue: Venue;
  displayedColumns = ['name'];
  dataSource: MatTableDataSource<Venue> = new MatTableDataSource(this.venues);
  zoom = 14;
  sort;
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  constructor(private venueService: VenueService,
              private http: HttpService,
              private utilService: UtilityService) {
                this.http.getVenues();
               }

  ngOnInit() {
    this.subscription = this.venueService.venuesChanged.subscribe(
      (venues: Venue[]) => {
        this.venues = venues;
        console.log('Venues: ', this.venues);
        this.dataSource.filterPredicate = this.utilService.tableFilter();
        this.dataSource.data = venues;
        this.dataSource.sort = this.sort;
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  

}
