import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artist } from './../../shared/artist.model';
import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

  artist: Artist;
  id: number;

  constructor(private artistService: ArtistService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.artist = this.artistService.getArtist(this.id);
      }
    );
  }

}
