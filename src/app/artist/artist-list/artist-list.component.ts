import { EventService } from 'src/app/event/event.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { trigger, transition, animate, state, style } from '@angular/animations';
import { HttpService } from './../../shared/http.service';
import {Artist} from '../../shared/artist.model';
import { UtilityService, Grid } from './../../shared/utility.service';
import {ArtistService} from '../artist.service';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/shared/event.model';
import { Page } from 'src/app/shared/page-model';


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
  artistPage: Page;

  array: Array<number>;
  currentPage = 0;
  pageSize = 10;
  events = new Array<Event>();
  subscription = new Subscription();
  subscriptionEvents = new Subscription();
  dataSource: MatTableDataSource<Artist> = new MatTableDataSource(this.artists);
  displayedColumns = ['name'];
  expandedArtist: Artist;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private artistService: ArtistService,
              private utilityService: UtilityService,
              private httpService: HttpService,
              private eventService: EventService) {}

  ngOnInit() {
    this.httpService.getAllArtists();
    this.subscription = this.artistService.artistsChanged.subscribe(
      (artists: Artist[]) => {
        this.artists = artists;
        this.dataSource.data = this.artists;
        this.dataSource.filterPredicate = this.utilityService.tableFilter();
      }
    );
    // this.httpService.getArtists(0, 10);
    // this.subscription = this.artistService.artistPageChanged.subscribe(
    //   (artistPage: Page) => {
    //     this.artistPage = artistPage;
    //     this.artists = artistPage.objects;
    //     this.array = this.utilityService.createNumberArray(artistPage.totalPages);
    //     this.dataSource.data = this.artists;
    //     this.dataSource.filterPredicate = this.utilityService.tableFilter();
    //   }
    // );
    this.subscriptionEvents = this.eventService.eventPageChanged.subscribe(
      (eventPage: Page) => {
        this.events = eventPage.objects;
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionEvents.unsubscribe();
  }

  onClick(artist: Artist) {
    this.httpService.getEventsByArtist(artist.id, 0, 3);
    this.artistService.setArtist(artist);
  }

  onPage(page: number) {
    this.httpService.getArtists(page - 1, this.pageSize);
  }

  onFilterFocus() {
    this.httpService.getArtists(0, this.artistPage.totalElements);
  }

}
