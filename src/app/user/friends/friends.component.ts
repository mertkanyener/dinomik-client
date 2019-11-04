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
  subscriptionSearch: Subscription;
  friends: Friend[];
  searchFriends: Friend[];
  showFriends = true;
  searchValue = '';

  constructor(public userHttpService: UserHttpService,
              public userService: UserService,
              public utilService: UtilityService) { }

  ngOnInit() {
    this.userHttpService.getFriends();
    this.subscription = this.userService.friendsChanged.subscribe(
      (friends: Friend[]) => {
        console.log('Friends: ', friends);
        this.friends = this.utilService.transformObjectArray(friends, 4);
      }
    );
    this.subscriptionSearch = this.userService.searchFriendsChanged.subscribe(
      (friends: Friend[]) => {
        this.searchFriends = friends;
      }
    );
  }

  onAddFriend(friend: Friend) {
    this.userHttpService.addFriend(friend);
  }

  onRemoveFriend(id: number) {
    this.userHttpService.deleteFriend(id);
  }

  getPictureUrl(userId: number) {
    return 'https://graph.facebook.com/' + userId + '/picture?type=square';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionSearch.unsubscribe();
  }

  



}
