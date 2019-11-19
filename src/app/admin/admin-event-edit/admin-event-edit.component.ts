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
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Event } from 'src/app/shared/event.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-admin-event-edit',
  templateUrl: './admin-event-edit.component.html',
  styleUrls: ['./admin-event-edit.component.css']
})
export class AdminEventEditComponent implements OnInit, OnDestroy {

  hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
           '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  editMode = false;
  id: number;
  event = new Event();
  artists: Artist[];
  allArtists: Artist[];
  venue: Venue;
  allVenues: Venue[];
  form: FormGroup;
  fb = new FormBuilder();
  artistCtrl = new FormControl();
  venueCtrl = new FormControl();
  image = new Image('', null);
  useArtistImage = false;
  imageSubscription: Subscription;
  eventSubscription: Subscription;
  artistSubscription: Subscription;
  venueSubscription: Subscription;

  @ViewChild('artistInput') artistInput: ElementRef<HTMLInputElement>;
  @ViewChild('venueInput') venueInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutoComp: MatAutocomplete;

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
    this.initForm();
    this.artistHttpService.getAllArtists();
    this.venueHttpService.getVenues();
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
                this.setFormValues(event);
              }
            );
          } else {
            this.event = this.eventService.getEvent(this.id);
            this.setFormValues(this.event);
          }
        }
      }
    );
    this.imageSubscription = this.utilService.imageChanged.subscribe(
      (image: Image) => {
        this.image = image;
      }
    );
    this.artistSubscription = this.artistService.artistsChanged.subscribe(
      (artists: Artist[]) => {
        this.allArtists = artists;
      }
    );
    this.venueSubscription = this.venueService.venuesChanged.subscribe(
      (venues: Venue[]) => {
        this.allVenues = venues;
      }
    );

  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      date: [null, [Validators.required]],
      hour: [null, [Validators.required]],
      minute: [null, [Validators.required]]
    });
  }

  setFormValues(event: Event) {
    const timeArr = this.event.time.split(':');
    this.form.controls.hour.setValue(timeArr[0]);
    this.form.controls.minute.setValue(timeArr[1]);
    this.form.controls.name.setValue(event.name);
    this.artists = event.artists;
    this.venue = event.venue;
    this.image.dataUrl = event.image;
  }

  ngOnDestroy() {
    this.artistSubscription.unsubscribe();
    this.venueSubscription.unsubscribe();
    if (this.imageSubscription !== undefined) {
      this.imageSubscription.unsubscribe();
    }

    if (this.eventSubscription !== undefined) {
      this.eventSubscription.unsubscribe();
    }

  }

  onSave() {
    const value = this.form.value;
    const date: Date = value.date;
    const time: string = value.hour + ':' + value.minute;
    this.event.name = value.name;
    this.event.date = date;
    this.event.time = time;
    this.event.artists = this.artists;
    this.event.venue = this.venue;
    if (this.useArtistImage) {
      this.event.image = this.event.artists[0].image;
      this.image = null;
    }
    if (this.editMode) {
      this.eventHttpService.updateEvent(this.id, this.event, this.image.file);
    } else {
      this.eventHttpService.addEvent(this.event, this.image.file);
    }
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

  changeListener($event) {
    this.utilService.readImage($event.target, this.sanitizer, this.image);
  }

  selected(event: MatAutocompleteSelectedEvent, type: string) {
    if (type === 'artist') {
      this.artists.push(event.option.value);
      this.artistInput.nativeElement.value = '';
      this.artistCtrl.setValue(null);
    } else {
      this.venue = event.option.value;
      this.venueInput.nativeElement.value = '';
      this.venueCtrl.setValue(null);
    }
  }

  removeArtist(artist: Artist) {
    const index = this.artists.indexOf(artist);

    if (index >= 0) {
      this.artists.splice(index, 1);
    }
  }

  removeVenue() {
    this.venue = null;
  }



  private _filter(value: string, type: string): Artist[] {
    const filterValue = value.toLowerCase();

    if (type === 'artist') {
      return this.allArtists.filter(artist => artist.name.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return this.allVenues.filter(venue => venue.name.toLowerCase().indexOf(filterValue) === 0);
    }

  }

}
