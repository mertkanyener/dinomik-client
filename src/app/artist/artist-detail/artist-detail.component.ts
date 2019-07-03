import { MatTableDataSource } from '@angular/material';
import { HttpService } from 'src/app/shared/http.service';
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
  events: Event[];
  displayedColumns = ['name', 'venue', 'date', 'time'];
  dataSource: MatTableDataSource<Event> = new MatTableDataSource(this.events);
  subscription: Subscription;

  constructor(private artistService: ArtistService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private eventService: EventService) {

               }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.artist = this.artistService.getArtist(this.id);
        this.eventService.getEventsByArtist(this.id, this.artist.name);
        this.dataSource.data = this.events;
        console.log('Events: ', this.events);
        this.avatarStyle = {
          'background-image': this.sanitizer.bypassSecurityTrustUrl(this.artist.image),
          'background-size': 'cover'
        };
        this.image = this.artist.image;
      }
    );
    this.subscription = this.eventService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
