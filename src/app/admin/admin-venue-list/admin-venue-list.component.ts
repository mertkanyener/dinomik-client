import { UtilityService } from './../../shared/utility.service';
import { VenueService } from './../../venue/venue.service';
import { VenueHttpService } from './../../venue/venue-http.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Venue } from './../../shared/venue.model';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-admin-venue-list',
  templateUrl: './admin-venue-list.component.html',
  styleUrls: ['./admin-venue-list.component.css']
})
export class AdminVenueListComponent implements OnInit, OnDestroy {

  pageSize= 10;
  venues: Venue[];
  dataSource: MatTableDataSource<Venue> = new MatTableDataSource(this.venues);
  subscription: Subscription;
  displayedColumns: string[] = ['id', 'name', 'city' , 'edit', 'delete'];
  sort;
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public venueHttpService: VenueHttpService,
              public venueService: VenueService,
              public utilService: UtilityService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.venueHttpService.getVenues();
    this.subscription = this.venueService.venuesChanged.subscribe(
      (venues: Venue[]) => {
        this.venues = venues;
        this.dataSource.sort = this.sort;
        this.dataSource.data = venues;
        this.dataSource.filterPredicate = this.utilService.tableFilter();
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.venueHttpService.deleteVenue(id);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
