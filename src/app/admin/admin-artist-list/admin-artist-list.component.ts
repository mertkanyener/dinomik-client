import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../shared/http.service';
import {ArtistService} from '../../artist/artist.service';
import {Artist} from '../../shared/artist.model';
import { MatDialog, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import {Subscription} from 'rxjs';
import {UtilityService} from '../../shared/utility.service';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import { trigger, transition, animate, state, style } from '@angular/animations';
import { ArtistHttpService } from 'src/app/artist/artist-http.service';

@Component({
  selector: 'app-admin-artist-list',
  templateUrl: './admin-artist-list.component.html',
  styleUrls: ['./admin-artist-list.component.css']
})
export class AdminArtistListComponent implements OnInit, OnDestroy {

  pageSize = 10;
  artists: Artist[];
  expandedArtist: Artist;
  dataSource: MatTableDataSource<Artist> = new MatTableDataSource(this.artists);
  subscription: Subscription;
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  sort;
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public artistHttpService: ArtistHttpService,
              public artistService: ArtistService,
              public utilService: UtilityService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.artistHttpService.getAllArtists();
    this.subscription = this.artistService.artistsChanged.subscribe(
      (artists: Artist[]) => {
        this.artists = artists;
        this.dataSource.sort = this.sort;
        this.dataSource.data = artists;
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
        this.artistHttpService.deleteArtist(id);
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
