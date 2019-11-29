import { UserHttpService } from './../user-http.service';
import { UtilityService } from 'src/app/shared/utility.service';
import { User } from './../../shared/user.model';
import { Subscription } from 'rxjs';
import { Artist } from './../../shared/artist.model';
import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-liked-artists',
  templateUrl: './liked-artists.component.html',
  styleUrls: ['./liked-artists.component.css']
})
export class LikedArtistsComponent implements OnInit, OnDestroy {

  artists = new Array<Artist>();
  dataArrArtists = new Array<Artist>();
  subscription: Subscription;
  subscriptionScreenSize: Subscription;
  height = window.innerHeight;
  searchValue = '';
  screenWidth: number;
  screenSize: string;


  constructor(public userService: UserService,
              public userHttpService: UserHttpService,
              public utilService: UtilityService) {
                this.getScreenSize();
               }

  ngOnInit() {
    this.dataArrArtists = this.userService.getUser().likedArtists;
    this.artists = this.utilService.transformObjectArray(this.dataArrArtists, this.screenSize);
    this.subscription = this.userService.userChanged.subscribe(
      (user: User) => {
        this.artists = this.utilService.transformObjectArray(user.likedArtists, this.screenSize);
        console.log('artists 1: ', this.artists);
      }
    );

    this.subscriptionScreenSize = this.utilService.screenSizeChanged.subscribe(
      (size: string) => {
        this.screenSize = size;
        if (this.artists !== undefined) {
          this.artists = this.utilService.transformObjectArray(this.dataArrArtists, this.screenSize);
        }
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
    this.artists = this.utilService.transformObjectArray(result, this.screenSize);
  }

  onRemoveArtist(id: number) {
    this.userHttpService.deleteLikedArtist(id);
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenWidth = window.innerWidth;
        this.height = window.innerHeight;
        const size = this.utilService.calculateScreenSize(this.screenWidth);
        if (this.screenSize === undefined) {
          this.screenSize = size;
        }
        this.utilService.setScreenSize(size);
        console.log('Width: ', this.screenWidth, '  Screen Size: ', this.screenSize);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
