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
  subscriptionScreenSize: Subscription;
  friends: Friend[];
  userFriends: Friend[];
  searchFriends: Friend[];
  showFriends = true;
  searchValue = '';

  screenWidth: number;
  screenSize: string;

  constructor(public userHttpService: UserHttpService,
              public userService: UserService,
              public utilService: UtilityService) { }

  ngOnInit() {
    this.userHttpService.getFriends();
    this.subscription = this.userService.friendsChanged.subscribe(
      (friends: Friend[]) => {
        this.userFriends = friends;
        this.friends = this.utilService.transformObjectArray(friends, this.screenSize);
      }
    );
    this.subscriptionSearch = this.userService.searchFriendsChanged.subscribe(
      (friends: Friend[]) => {
        this.searchFriends = this.utilService.transformObjectArray(friends, this.screenSize);
        console.log('Search results: ', this.searchFriends);
      }
    );

    this.subscriptionScreenSize = this.utilService.screenSizeChanged.subscribe(
      (screenSize: string) => {
        this.screenSize = screenSize;
        if (this.friends !== undefined && this.showFriends) {
          this.friends = this.utilService.transformObjectArray(this.userFriends, this.screenSize);
        }
        if (this.searchFriends !== undefined) {
          this.searchFriends = this.utilService.transformObjectArray(this.searchFriends, this.screenSize);
        }
      }
    );
  }

  onAddFriend(friend: Friend) {
    this.userHttpService.addFriend(friend);
  }

  onRemoveFriend(id: number) {
    this.userHttpService.deleteFriend(id);
  }

  onShowFriends() {
    this.showFriends = true;
  }

  onSearch(searchValue: string) {
    const arr = searchValue.split(' ');
    let firstName = '';
    let lastName = '';
    if (arr.length > 2) {
      for (let i = 0; i < arr.length - 1; i++) {
        firstName = firstName + ' ' + arr[i];
      }
    } else {
      firstName = arr[0];
    }
    if (arr.length !== 1){
      lastName = arr[arr.length - 1];
    }
    console.log('First name: ', firstName, '  Last name: ', lastName);
    this.userHttpService.searchFriends(firstName, lastName);
    this.showFriends = false;
  }

  getPictureUrl(userId: number) {
    return 'https://graph.facebook.com/' + userId + '/picture?type=square';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionSearch.unsubscribe();
  }
}
