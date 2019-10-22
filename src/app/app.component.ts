import { User } from 'src/app/shared/user.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'dinomik-client';
  routerHeight = window.innerHeight;
  userId: number;
  pictureUrl: string;
  subscription: Subscription;


  constructor(public authService: AuthService,
              public userService: UserService,
              public dialog: MatDialog) {

              }
  //

  ngOnInit() {
    this.subscription = this.userService.userChanged.subscribe(
      (user: User) => {
        this.userId = user.id;
        this.pictureUrl = 'https://graph.facebook.com/' + this.userId + '/picture?width=50&height=50';
      }
    );
  }

  onRegisterLogin() {
    this.dialog.open(LoginComponent, {width: '25rem', height: '35rem', panelClass: 'dino-dialog'});
  }


}
