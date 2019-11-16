import { EventHttpService } from './../../event/event-http.service';
import { ArtistHttpService } from './../artist-http.service';
import { Page } from './../../shared/page-model';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artist } from './../../shared/artist.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArtistService } from '../artist.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EventService } from 'src/app/event/event.service';
import { Event } from 'src/app/shared/event.model';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit, OnDestroy {

  artist: Artist;
  id: number;
  image: string;
  avatarStyle: any;
  eventPage: Page;

  events: Event[];
  displayedColumns = ['name', 'venue', 'date', 'time'];
  dataSource: MatTableDataSource<Event> = new MatTableDataSource(this.events);
  subscription = new Subscription();
  subscriptionArtist: Subscription;

  constructor(private artistService: ArtistService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private eventService: EventService,
              private artistHttpService: ArtistHttpService,
              private eventHttpService: EventHttpService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
    if (this.artistService.getArtists() === undefined) {
      this.artistHttpService.getArtist(this.id);
      this.subscriptionArtist = this.artistService.artistChanged.subscribe(
        (artist: Artist) => {
          this.artist = artist;
        }
      );
    } else {
      this.artist = this.artistService.getArtistById(this.id);
    }
    this.eventHttpService.getEventsByArtist(this.id, 0, 50);
    this.subscription = this.eventService.eventPageChanged.subscribe(
      (eventPage: Page) => {
        this.events = this.eventService.normalizeEventNames(eventPage.objects, this.artist.name);
        this.events = this.eventService.translateEventDates(this.events);
        this.dataSource.data = this.events;
        console.log('Events: ', this.events);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
    this.avatarStyle = {
      'background-image': this.sanitizer.bypassSecurityTrustUrl(this.artist.image),
      'background-size': 'cover'
    };
    this.image = this.artist.image;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.subscriptionArtist !== undefined) {
      this.subscriptionArtist.unsubscribe();
    }
  }

}
