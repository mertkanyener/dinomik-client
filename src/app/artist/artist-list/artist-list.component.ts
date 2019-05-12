import { HttpService } from './../../shared/http.service';
import { UtilityService, Grid } from './../../shared/utility.service';
import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../artist.service';
import {Artist} from '../../shared/artist.model';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

  artists = new Array<Artist>(50);
  grid: Grid;
  objectArray: Array<Artist[]>;
  colSize = 5;

  constructor(private artistService: ArtistService,
              private utilityService: UtilityService,
              private httpService: HttpService) { 
                this.httpService.getArtists();
              }

  ngOnInit() {
    // this.artists = this.artistService.getArtists();
    // console.log('Artists: ', this.artists);
    // this.grid = this.utilityService.calculateGrid(this.artists.length);
    // this.objectArray = this.utilityService.transformObjectArray(this.artists, this.colSize, this.grid.lgRows);
    // console.log('Artists: ', this.artists, '   Grid: ', this.grid);
    this.artistService.artistsChanged.subscribe(
      (artists: Artist[]) => {
        this.artists = artists;
        console.log('Artists: ', this.artists);
        this.grid = this.utilityService.calculateGrid(this.artists.length);
        this.objectArray = this.utilityService.transformObjectArray(this.artists, this.colSize, this.grid.lgRows);
      }
    );
  }

}
