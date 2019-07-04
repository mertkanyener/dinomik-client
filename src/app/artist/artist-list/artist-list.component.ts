import { MatTableDataSource, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { trigger, transition, animate, state, style } from '@angular/animations';
import { HttpService } from './../../shared/http.service';
import {Artist} from '../../shared/artist.model';
import { UtilityService, Grid } from './../../shared/utility.service';
import {ArtistService} from '../artist.service';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/shared/event.model';


@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class ArtistListComponent implements OnInit, OnDestroy {

  artists = new Array<Artist>(50);
  grid: Grid;
  objectArray: Array<Artist[]>;
  colSize = 5;

  events = new Array<Event>();
  subscription = new Subscription();
  subscriptionEvents = new Subscription();
  dataSource: MatTableDataSource<Artist> = new MatTableDataSource(this.artists);
  displayedColumns = ['name'];
  expandedArtist: Artist;
  sort;
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  constructor(private artistService: ArtistService,
              private utilityService: UtilityService,
              private httpService: HttpService) {
                this.httpService.getArtists();
              }

  ngOnInit() {
    this.subscription = this.artistService.artistsChanged.subscribe(
      (artists: Artist[]) => {
        this.artists = artists;
        console.log('Artists: ', this.artists);
        this.dataSource.filterPredicate = this.utilityService.tableFilter();
        this.dataSource.data = artists;
        this.dataSource.sort = this.sort;
        this.grid = this.utilityService.calculateGrid(this.artists.length);
        this.objectArray = this.utilityService.transformObjectArray(this.artists, this.colSize, this.grid.lgRows);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick(id: number) {
    
  }

}
