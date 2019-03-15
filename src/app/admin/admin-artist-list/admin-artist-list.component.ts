import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../shared/http.service';
import {ArtistService} from '../../artist/artist.service';
import {Artist} from '../../shared/artist.model';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {UtilityService} from '../../shared/utility.service';

@Component({
  selector: 'app-admin-artist-list',
  templateUrl: './admin-artist-list.component.html',
  styleUrls: ['./admin-artist-list.component.css']
})
export class AdminArtistListComponent implements OnInit, OnDestroy {

  artists: Artist[];
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
              private utilService: UtilityService) { }

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





}
