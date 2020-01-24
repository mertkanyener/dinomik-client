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
import { Subscription, Observable } from 'rxjs';
import { Image } from './../../shared/image.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Event } from 'src/app/shared/event.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent, MatCheckboxChange } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { Genre } from 'src/app/shared/genre.interface';

@Component({
  selector: 'app-admin-event-edit',
  templateUrl: './admin-event-edit.component.html',
  styleUrls: ['./admin-event-edit.component.css']
})
export class AdminEventEditComponent implements OnInit, OnDestroy {

  hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
           '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  genreList: Genre[] = [
    {id: 1, name: 'Pop'},
    {id: 2, name: 'Electronic'},
    {id: 3, name: 'Rock'},
    {id: 4, name: 'Metal'},
    {id: 5, name: 'Jazz'},
    {id: 6, name: 'Rap'},
  ];

  editMode = false;
  id: number;
  event = new Event();
  artists = new Array<Artist>();
  allArtists = new Array<Artist>();
  filteredArtists: Observable<Artist[]>;
  venues = new Array<Venue>();
  allVenues = new Array<Venue>();
  filteredVenues: Observable<Venue[]>;
  genres = new Array<Genre>();
  filteredGenres: Observable<Genre[]>;
  form: FormGroup;
  fb = new FormBuilder();
  artistCtrl = new FormControl();
  venueCtrl = new FormControl();
  genreCtrl = new FormControl();
  image = new Image('', null);
  useArtistImage = false;
  removable = true;
  selectable = false;
  imageSubscription: Subscription;
  eventSubscription: Subscription;
  artistSubscription: Subscription;
  venueSubscription: Subscription;
  today = new Date();

  @ViewChild('artistInput') artistInput: ElementRef<HTMLInputElement>;
  @ViewChild('venueInput') venueInput: ElementRef<HTMLInputElement>;
  @ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoArtist') matAutoCompArtist: MatAutocomplete;
  @ViewChild('autoVenue') matAutoCompVenue: MatAutocomplete;
  @ViewChild('autoGenre') matAutoCompGenre: MatAutocomplete;
  @ViewChild('imageInput') imageInput: ElementRef;

  constructor(public eventService: EventService,
              public eventHttpService: EventHttpService,
              public artistHttpService: ArtistHttpService,
              public artistService: ArtistService,
              public venueService: VenueService,
              public venueHttpService: VenueHttpService,
              public route: ActivatedRoute,
              public router: Router,
              public utilService: UtilityService,
              public sanitizer: DomSanitizer) {

                this.filteredArtists = this.artistCtrl.valueChanges.pipe(
                  startWith(''),
                  map(value => typeof value === 'string' ? value : value.name),
                  map(name => name ? this._filterArtist(name) : this.allArtists.slice())
                );

                this.filteredVenues = this.venueCtrl.valueChanges.pipe(
                  startWith(''),
                  map(value => typeof value === 'string' ? value : value.name),
                  map(name => name ? this._filterVenue(name) : this.allVenues.slice())
                );

                this.filteredGenres = this.genreCtrl.valueChanges.pipe(
                  startWith(''),
                  map(value => typeof value === 'string' ? value : value.name),
                  map(name => name ? this._filterGenre(name) : this.genreList.slice())
                );

               }

  ngOnInit() {
    console.log('Today: ', this.today);
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
        console.log('IMAGE: ', this.image);
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
      date: this.fb.group({
        startDate: [null, [Validators.required]],
        endDate: [null]
      }, { validators: this.validateDates }),
      hour: [null, [Validators.required]],
      minute: [null, [Validators.required]],
      webLink: [null, [Validators.required]],
      spotifyLink: [null]
    });
  }

  setFormValues(event: Event) {
    const timeArr = event.time.split(':');
    this.form.controls.hour.setValue(timeArr[0]);
    this.form.controls.minute.setValue(timeArr[1]);
    this.form.controls.name.setValue(event.name);
    this.form.controls.date.setValue(event.date);
    this.form.controls.endDate.setValue(event.endDate);
    this.form.controls.webLink.setValue(event.webLink);
    this.form.controls.spotifyLink.setValue(event.spotifyLink);
    this.artists = event.artists;
    this.venues.push(event.venue);
    this.genres = event.genres;
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
    this.event.venue = this.venues[0];
    this.event.spotifyLink = value.spotifyLink;
    this.event.webLink = value.webLink;
    this.event.genres = this.genres;
    if (this.useArtistImage) {
      this.event.image = this.event.artists[0].image;
    }
    if (this.editMode) {
      console.log('Updated Event: ', this.event);
      if (this.useArtistImage) {
        this.eventHttpService.updateEvent(this.id, this.event);
      } else {
        this.eventHttpService.updateEvent(this.id, this.event, this.image.file);
      }
    } else {
      console.log('New Event: ', this.event);
      if (this.useArtistImage) {
        this.eventHttpService.addEvent(this.event);
      } else {
        this.eventHttpService.addEvent(this.event, this.image.file);
      }
    }
    this.navigate();
  }

  onCancel() {
    this.navigate();
  }

  navigate() {
    if (this.editMode) {
      this.router.navigate(['/admin/events']);
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  changeListener($event) {
    this.utilService.readImage($event.target, this.sanitizer, this.image);
  }

  selected(event: MatAutocompleteSelectedEvent, type: string) {
    if (type === 'artist') {
      const selectedArtist: Artist = event.option.value;
      const index = this.allArtists.indexOf(selectedArtist);
      if (this.artists.find(x => x.id === selectedArtist.id) === undefined) {
        this.artists.push(selectedArtist);
        this.allArtists.splice(index, 1);
      } else {
        alert('Sanatçı zaten eklenmiş!');
      }
      this.artistInput.nativeElement.value = '';
      this.artistCtrl.setValue('');
    } else if (type === 'venue') {
      this.venues.push(event.option.value);
      this.venueInput.nativeElement.value = '';
      this.venueCtrl.setValue(null);
    } else {
      const selectedGenre: Genre = event.option.value;
      const index = this.genreList.indexOf(selectedGenre);
      if (this.genres.find(x => x.id === selectedGenre.id) === undefined) {
        this.genres.push(selectedGenre);
        this.genreList.splice(index, 1);
      } else {
        alert('Genre zaten eklenmiş!');
      }
    }
  }

  removeArtist(artist: Artist) {
    const index = this.artists.indexOf(artist);

    if (index >= 0) {
      this.artists.splice(index, 1);
      this.allArtists.push(artist);
    }
  }

  removeGenre(genre: Genre) {
    const index = this.genres.indexOf(genre);

    if (index >= 0) {
      this.genres.splice(index, 1);
      this.genreList.push(genre);
    }
  }

  removeVenue(venue: Venue) {
    const index = this.venues.indexOf(venue);

    if (index >= 0) {
      this.venues.splice(index, 1);
    }
  }

  private _filterArtist(value: string): Artist[] {
    const filterValue = value.toLowerCase();
    return this.allArtists.filter(artist => artist.name.toLowerCase().indexOf(filterValue) === 0);

  }

  private _filterVenue(value: string): Venue[] {
    const filterValue = value.toLowerCase();
    return this.allVenues.filter(venue => venue.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterGenre(value: string): Genre[] {
    const filterValue = value.toLowerCase();
    return this.genreList.filter(genre => genre.name.toLowerCase().indexOf(filterValue) === 0);
  }

  isMultiArtistEvent(): boolean {
    return this.artists.length > 1;
  }

  venueSelected(): boolean {
    return this.venues.length > 0;
  }

  setUseArtistImage(event: MatCheckboxChange) {
    if (event.checked) {
      this.utilService.clearImage();
      this.imageInput.nativeElement.value = '';
    }
  }

  private validateDates(c: AbstractControl) {
    const startDate: Date = c.get('startDate').value;
    const endDate: Date = c.get('endDate').value;
    console.log('End date: ', endDate);
    if (endDate !== null && endDate <= startDate) {
      c.get('endDate').setErrors({ 'WrongDateInput' : true });
    }

  }

}
