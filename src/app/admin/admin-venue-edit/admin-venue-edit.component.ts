import { City } from 'src/app/shared/city.interface';
import { Image } from './../../shared/image.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { UtilityService } from 'src/app/shared/utility.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VenueHttpService } from './../../venue/venue-http.service';
import { VenueService } from 'src/app/venue/venue.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Venue } from 'src/app/shared/venue.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-venue-edit',
  templateUrl: './admin-venue-edit.component.html',
  styleUrls: ['./admin-venue-edit.component.css']
})
export class AdminVenueEditComponent implements OnInit, OnDestroy {

  editMode = false;
  id: number;
  venue: Venue;
  form: FormGroup;
  fb = new FormBuilder();
  image = new Image('', null);
  imageSubscription: Subscription;
  venueSubscription: Subscription;
  cityList: City[] = [
    { value: 'istanbul', viewValue: 'İstanbul' },
    { value: 'ankara', viewValue: 'Ankara' },
    { value: 'izmir', viewValue: 'İzmir' }
  ];

  constructor(public venueService: VenueService,
              public venueHttp: VenueHttpService,
              public router: Router,
              public utilService: UtilityService,
              public dialog: MatDialog,
              public sanitizer: DomSanitizer,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.route.url.subscribe(
      (url: any) => {
        console.log('Url: ', url[0].path);
      }
    );
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = +params['id'];
    //     if (params['id'] !== null) {
    //       this.editMode = true;
    //       if (this.venueService.getVenues() === undefined) {
    //         this.venueHttp.getVenue(this.id);
    //         this.venueSubscription = this.venueService.venueChanged.subscribe(
    //           (venue: Venue) => {
    //             this.venue = venue;
    //             this.setFormValues(venue);
    //           }
    //         );
    //       } else {
    //         this.venue = this.venueService.getVenue(this.id);
    //         this.setFormValues(this.venue);
    //       }
    //     }
    //   }
    // );
    this.imageSubscription = this.utilService.imageChanged.subscribe(
      (image: Image) => {
        this.image = image;
      }
    );
  }

  ngOnDestroy() {
    if (this.imageSubscription !== undefined) {
      this.imageSubscription.unsubscribe();
    }

    if (this.venueSubscription !== undefined) {
      this.venueSubscription.unsubscribe();
    }

  }

  onSave() {
    const value = this.form.value;
    this.venue = new Venue();
    this.venue.name = value.name;
    this.venue.address = value.address;
    this.venue.latitude = value.latitude;
    this.venue.longitude = value.longitude;
    this.venue.city = value.city;
    if (this.editMode) {
      this.venueHttp.updateVenue(this.id, this.venue, this.image.file);
    } else {
      this.venueHttp.addVenue(this.venue, this.image.file);
    }
    this.navigate();
  }

  onCancel() {
    this.navigate();
  }

  changeListener($event) {
    this.utilService.readImage($event.target, this.sanitizer, this.image);
  }

  navigate() {
    if (this.editMode) {
      this.router.navigate(['/admin/venues']);
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  private initForm() {
    const regex = new RegExp(/^\d+\.\d+$/);
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      latitude: ['', [Validators.required, Validators.pattern(regex)]],
      longitude: ['', [Validators.required, Validators.pattern(regex)]],
      city: [null, [Validators.required]]
    });
  }

  setFormValues(venue: Venue) {
    this.form.controls.name.setValue(venue.name);
    this.form.controls.address.setValue(venue.address);
    this.form.controls.latitude.setValue(venue.latitude);
    this.form.controls.longitude.setValue(venue.longitude);
    this.form.controls.city.setValue(venue.city);
    this.image.dataUrl = venue.image;
  }

}
