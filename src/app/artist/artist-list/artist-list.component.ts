import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../artist.service';
import {Artist} from '../../shared/artist.model';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

  artists : Artist[];

  constructor(private artistService: ArtistService) { }

  ngOnInit() {

    this.artistService.artistsChanged.subscribe(
      (artists: Artist[]) => {
        this.artists = artists;
      }
    );
  }



}
