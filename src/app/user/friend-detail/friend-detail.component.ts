import { AuthService } from './../../auth/auth.service';
import { UtilityService } from './../../shared/utility.service';
import { Event } from './../../shared/event.model';
import { Friend } from './../../shared/friend.model';
import { Subscription } from 'rxjs';
import { User } from './../../shared/user.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from './../user.service';
import { UserHttpService } from './../user-http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.css']
})
export class FriendDetailComponent implements OnInit, OnDestroy {

  user: User;
  friend: Friend;
  id: number;
  subscription: Subscription;
  subscriptionFriend: Subscription;
  shownSavedEvents = new Array<Event>();
  shownAttendingEvents = new Array<Event>();


  constructor(public userHttpService: UserHttpService,
              public userService: UserService,
              public route: ActivatedRoute,
              public router: Router,
              public utilService: UtilityService,
              public authService: AuthService) { }

  //

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
    this.subscription = this.userService.otherUserChanged.subscribe(
      (user: User) => {
        this.user = user;
        if (this.user.savedEvents.length > 3) {
          this.shownSavedEvents = this.user.savedEvents.slice(0, 3);
        } else {
          this.shownSavedEvents = this.user.savedEvents;
        }
        if (this.user.attendingEvents.length > 3) {
          this.shownAttendingEvents = this.user.attendingEvents.slice(0, 3);
        } else {
          this.shownAttendingEvents = this.user.attendingEvents;
        }
        this.shownAttendingEvents = this.utilService.transformObjectArray(this.shownAttendingEvents, 'lg');
        this.shownSavedEvents = this.utilService.transformObjectArray(this.shownSavedEvents, 'lg');
        this.friend = new Friend(this.user.id, this.user.firstName, this.user.lastName, this.user.image, this.user.facebookUser);
      }
    );
    this.userHttpService.getUser(this.id.toString(), 'other');
  }

  onAddFriend() {
    this.userHttpService.addFriend(this.friend);
  }

  onRemoveFriend(id: number) {
    this.userHttpService.deleteFriend(id);
  }

  onShowAllSaved() {
    this.shownSavedEvents = this.user.savedEvents;
  }

  onShowAllAttending() {
    this.shownAttendingEvents = this.user.attendingEvents;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
