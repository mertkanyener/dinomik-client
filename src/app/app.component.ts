import { UserHttpService } from './user/user-http.service';
import { UtilityService } from './shared/utility.service';
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
  user: User;
  pictureUrl: string;
  subscription: Subscription;
  hasPhoto = true;
  headerWidth = 90;


  constructor(public authService: AuthService,
              public userService: UserService,
              public userHttpService: UserHttpService,
              public utilService: UtilityService,
              public dialog: MatDialog) {

              }
  //

  ngOnInit() {
    this.subscription = this.userService.userChanged.subscribe(
      (user: User) => {
        this.user = user;
        if (user.facebookUser) {
          this.pictureUrl = user.image + '?width=50&height=50';
        } else {
          this.pictureUrl = user.image;
          if (this.pictureUrl === null || this.pictureUrl === undefined) {
            this.hasPhoto = false;
          } else {
            this.hasPhoto = true;
          }
        }
      }
    );
  }

  onRegisterLogin() {
    this.dialog.open(LoginComponent, {width: '25rem', height: '35rem', panelClass: 'dino-dialog'});
  }

  onPhotoSelected($event) {
    this.userHttpService.saveImage($event.target.files[0]);
  }

  isAdminView(): boolean {
    const arr = window.location.pathname.split('/');
    const result = arr[1] === 'admin' || this.authService.isAdmin(); 
    if (result) {
      this.headerWidth = 100;
    }
    return result;
  }


}
