import { HttpService } from 'src/app/shared/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artist } from './../../shared/artist.model';
import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

  artist: Artist;
  id: number;
  image: string;
  avatarStyle: any;

  constructor(private artistService: ArtistService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private httpService: HttpService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.artist = this.httpService.getArtist(this.id);
        // this.artist = this.artistService.getArtist(this.id);
        this.avatarStyle = {
          'background-image': this.sanitizer.bypassSecurityTrustUrl(this.artist.image),
          'background-size': 'cover'
        };
        this.image = this.artist.image;
      }
    );
  }

}
