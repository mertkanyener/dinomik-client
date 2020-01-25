import { UtilityService } from './../../shared/utility.service';
import { EventHttpService } from './../../event/event-http.service';
import { EventService } from './../../event/event.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Event } from 'src/app/shared/event.model';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.css']
})
export class AdminEventListComponent implements OnInit, OnDestroy {

  pageSize = 10;
  events: Event[];
  dataSource: MatTableDataSource<Event> = new MatTableDataSource(this.events);
  subscription: Subscription;
  displayedColumns = ['id', 'name', 'date', 'edit', 'delete'];
  sort;
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public eventService: EventService,
              public eventHttpService: EventHttpService,
              public utilService: UtilityService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.eventHttpService.getAllEvents('coming');
    
    this.subscription = this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
        console.log('Events: ', this.events)
        this.dataSource.data = events;
        this.dataSource.sort = this.sort;
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
        this.eventHttpService.deleteEvent(id);
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
