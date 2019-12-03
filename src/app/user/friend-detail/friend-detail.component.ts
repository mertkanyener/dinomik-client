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
  id: number;
  subscription: Subscription;


  constructor(public userHttpService: UserHttpService,
              public userService: UserService,
              public route: ActivatedRoute,
              public router: Router) { }

  //

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.userHttpService.getUser(this.id.toString(), 'other');
      }
    );
    this.subscription = this.userService.otherUserChanged.subscribe(
      (user: User) => {
        this.user = user;
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
