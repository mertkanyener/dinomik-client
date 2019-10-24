import { UtilityService } from './../../shared/utility.service';
import { Friend } from './../../shared/friend.model';
import { Subscription } from 'rxjs';
import { UserService } from './../user.service';
import { UserHttpService } from './../user-http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnDestroy {

  height = window.innerHeight;
  subscription: Subscription;
  friends: Friend[];

  constructor(public userHttpService: UserHttpService,
              public userService: UserService,
              public utilService: UtilityService) { }

  ngOnInit() {
    this.userHttpService.getFriends();
    this.subscription = this.userService.friendsChanged.subscribe(
      (friends: Friend[]) => {
        this.friends = this.utilService.transformObjectArray(friends, 4);
      }
    );
  }

  getPictureUrl(userId: number) {
    return 'https://graph.facebook.com/' + userId + '/picture?type=square';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
