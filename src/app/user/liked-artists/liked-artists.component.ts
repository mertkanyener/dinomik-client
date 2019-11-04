import { UserHttpService } from './../user-http.service';
import { UtilityService } from 'src/app/shared/utility.service';
import { User } from './../../shared/user.model';
import { Subscription } from 'rxjs';
import { Artist } from './../../shared/artist.model';
import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-liked-artists',
  templateUrl: './liked-artists.component.html',
  styleUrls: ['./liked-artists.component.css']
})
export class LikedArtistsComponent implements OnInit, OnDestroy {

  artists = new Array<Artist>();
  dataArrArtists = new Array<Artist>();
  subscription: Subscription;
  height = window.innerHeight;
  searchValue = '';

  constructor(public userService: UserService,
              public userHttpService: UserHttpService,
              public utilService: UtilityService) { }

  ngOnInit() {
    this.dataArrArtists = this.userService.getUser().likedArtists;
    this.artists = this.utilService.transformObjectArray(this.dataArrArtists, 3);
    this.subscription = this.userService.userChanged.subscribe(
      (user: User) => {
        this.artists = this.utilService.transformObjectArray(user.likedArtists, 3);
        console.log('artists 1: ', this.artists);
      }
    );
  }
  
  onSearch(value: string) {
    const regex = new RegExp('.*' + value + '.*', 'i');
    console.log('regex: ', regex);
    const result = new Array<Artist>();
    this.dataArrArtists.forEach(
      x => {
        if (x.name.match(regex) !== undefined && x.name.match(regex)) {
          result.push(x);
        }
      }
    );
    this.artists = this.utilService.transformObjectArray(result, 3);
  }

  onRemoveArtist(id: number) {
    this.userHttpService.deleteLikedArtist(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
