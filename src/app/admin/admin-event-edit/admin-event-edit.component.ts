import { VenueHttpService } from './../../venue/venue-http.service';
import { VenueService } from 'src/app/venue/venue.service';
import { ArtistService } from 'src/app/artist/artist.service';
import { ArtistHttpService } from 'src/app/artist/artist-http.service';
import { Venue } from 'src/app/shared/venue.model';
import { Artist } from './../../shared/artist.model';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilityService } from 'src/app/shared/utility.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EventHttpService } from 'src/app/event/event-http.service';
import { EventService } from 'src/app/event/event.service';
import { Subscription } from 'rxjs';
import { Image } from './../../shared/image.model';
import { FormGroup } from '@angular/forms';
import { Event } from 'src/app/shared/event.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-event-edit',
  templateUrl: './admin-event-edit.component.html',
  styleUrls: ['./admin-event-edit.component.css']
})
export class AdminEventEditComponent implements OnInit, OnDestroy {

  editMode = false;
  id: number;
  event = new Event();
  artists: Artist[];
  allArtists: Artist[];
  venue: Venue;
  allVenues: Venue[];
  form: FormGroup;
  image = new Image('', null);
  imageSubscription: Subscription;
  eventSubscription: Subscription;
  artistSubscription: Subscription;
  venueSubscription: Subscription;

  constructor(public eventService: EventService,
              public eventHttpService: EventHttpService,
              public artistHttpService: ArtistHttpService,
              public artistService: ArtistService,
              public venueService: VenueService,
              public venueHttpService: VenueHttpService,
              public route: ActivatedRoute,
              public router: Router,
              public utilService: UtilityService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (params['id'] != null) {
          this.editMode = true;
          if (this.eventService.getEvent(this.id) === undefined) {
            this.eventHttpService.getEvent(this.id);
            this.eventSubscription = this.eventService.eventChanged.subscribe(
              (event: Event) => {
                this.event = event;
                
              }
            );
          }
        }
      }
    );
  }

  private initForm() {
    let name = '';

    
    
  }

  ngOnDestroy() {

  }

  onCancel() {
    this.navigate();
  }

  navigate() {
    if (this.editMode) {
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

}
