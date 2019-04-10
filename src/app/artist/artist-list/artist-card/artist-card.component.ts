import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../../../shared/artist.model';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css']
})
export class ArtistCardComponent implements OnInit {

  @Input() artist: Artist;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
