import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../shared/http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Artist} from '../../shared/artist.model';
import {ArtistService} from '../../artist/artist.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UtilityService} from '../../shared/utility.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Subject} from 'rxjs';
import {Image} from '../../shared/image.model';

@Component({
  selector: 'app-admin-artist-edit',
  templateUrl: './admin-artist-edit.component.html',
  styleUrls: ['./admin-artist-edit.component.css']
})
export class AdminArtistEditComponent implements OnInit {

  editMode = false;
  id : number;
  artist = new Artist();
  form : FormGroup;
  image = new Image("", null);
  imageChanged = new Subject<Image>();

  constructor(private http: HttpService,
              private route: ActivatedRoute,
              private artistService: ArtistService,
              private router: Router,
              private utilService: UtilityService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if(params['id'] != null) {
          this.editMode = true;
          this.artist = this.artistService.getArtist(this.id);
        }
      }
    );
    this.imageChanged.subscribe(
      (image: Image) => {
        this.image = image;
      }
    );
    this.initForm();
  }

  private initForm(){
    let name = '';
    let imgPath = '';

    if (this.editMode) {
      name = this.artist.name;
      imgPath = this.artist.imgPath;
    }
    this.form = new FormGroup({
      'name' : new FormControl(name),
      'imgPath' : new FormControl(imgPath)
    });
  }

  onSave(){
    let value = this.form.value;
    this.artist.name = value.name;
    this.artist.imgPath = value.imgPath;
    if (this.editMode) {
      this.http.updateArtist(this.id, this.artist);
      console.log("Artist: ", this.artist);
    } else {
      this.http.addArtist(this.artist)
    }
  }

  onCancel() {
    if (this.editMode) {
      this.router.navigate(['../../'], {relativeTo: this.route});

    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  changeListener($event){
    this.utilService.readImage($event.target, this.imageChanged, this.sanitizer, this.image);
  }

}
