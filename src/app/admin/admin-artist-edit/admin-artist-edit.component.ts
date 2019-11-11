import { Component, OnInit, OnDestroy } from '@angular/core';
import {HttpService} from '../../shared/http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Artist} from '../../shared/artist.model';
import {ArtistService} from '../../artist/artist.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UtilityService} from '../../shared/utility.service';
import {DomSanitizer} from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import {Image} from '../../shared/image.model';
import {MatDialog} from '@angular/material';
import { ArtistHttpService } from 'src/app/artist/artist-http.service';

@Component({
  selector: 'app-admin-artist-edit',
  templateUrl: './admin-artist-edit.component.html',
  styleUrls: ['./admin-artist-edit.component.css']
})
export class AdminArtistEditComponent implements OnInit, OnDestroy {

  editMode = false;
  id: number;
  artist = new Artist();
  form: FormGroup;
  image = new Image('', null);
  imageUploaded = false;
  viewedImageUrl: any;
  imageSubscription: Subscription;
  artistSubscription: Subscription;

  constructor(public artistHttpService: ArtistHttpService,
              public http: HttpService,
              public route: ActivatedRoute,
              public artistService: ArtistService,
              public router: Router,
              public utilService: UtilityService,
              public sanitizer: DomSanitizer,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (params['id'] != null) {
          this.editMode = true;
          if (this.artistService.getArtists() === undefined) {
            this.artistHttpService.getArtist(this.id);
            this.artistSubscription = this.artistService.artistChanged.subscribe(
              (artist: Artist) => {
                this.artist = artist;
                this.form.controls.name.setValue(artist.name);
                this.image.dataUrl = artist.image;
              }
            );
          } else {
            this.artist = this.artistService.getArtistById(this.id);
            this.form.controls.name.setValue(this.artist.name);
            this.image.dataUrl = this.artist.image;

          }
        }
      }
    );
    if (this.editMode) {
      this.image.dataUrl = this.artist.image;
      console.log('Image url: ', this.image.dataUrl);
    }
    this.imageSubscription = this.utilService.imageChanged.subscribe(
      (image: Image) => {
        this.image = image;
      }
    );
  }

  private initForm() {
    let name = '';
    if (this.editMode) {
      name = this.artist.name;
    }
    console.log('Artist form name: ', name );
    this.form = new FormGroup({
      'name' : new FormControl(name),
    });
  }

  onSave() {
    const value = this.form.value;
    this.artist.name = value.name;
    if (this.editMode) {
      this.artistHttpService.updateArtist(this.id, this.artist, this.image.file);
    } else {
      console.log('Image name: ', this.image.file.name);
      this.artistHttpService.addArtist(this.artist, this.image.file);
    }
    this.navigate();
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
    console.log('Image url : ', this.image.dataUrl);
  }

  ngOnDestroy() {
    if (this.artistSubscription !== undefined) {
      this.artistSubscription.unsubscribe();
    }

    if (this.imageSubscription !== undefined) {
      this.imageSubscription.unsubscribe();
    }
  }

}
