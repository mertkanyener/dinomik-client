import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../shared/http.service';
import {ArtistService} from '../../artist/artist.service';
import {Artist} from '../../shared/artist.model';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {UtilityService} from '../../shared/utility.service';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import { trigger, transition, animate, state, style } from '@angular/animations';

@Component({
  selector: 'app-admin-artist-list',
  templateUrl: './admin-artist-list.component.html',
  styleUrls: ['./admin-artist-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class AdminArtistListComponent implements OnInit, OnDestroy {

  artists: Artist[];
  expandedArtist: Artist;
  dataSource: MatTableDataSource<Artist> = new MatTableDataSource(this.artists);
  subscription: Subscription;
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  sort;
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if(this.sort){
      this.dataSource.sort = this.sort;
    }
  }

  constructor(private httpService: HttpService,
              private artistService: ArtistService,
              private utilService: UtilityService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.artists = this.artistService.getArtists();
    console.log("Artists: ", this.artists);
    this.dataSource = new MatTableDataSource(this.artists);
    this.dataSource.filterPredicate = this.utilService.tableFilter();
    this.dataSource.sort = this.sort;
    this.subscription = this.artistService.artistsChanged.subscribe(
      (artists: Artist[]) => {
        this.artists = artists;
        this.dataSource.data = artists;
        this.dataSource.filterPredicate = this.utilService.tableFilter();
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(id: number){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.httpService.deleteArtist(id);
      }
    });
  }







}
