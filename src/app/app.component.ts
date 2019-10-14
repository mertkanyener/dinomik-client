import { MatDialog } from '@angular/material';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import {Component} from '@angular/core';
import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'dinomik-client';
  routerHeight = window.innerHeight;

  constructor(public authService: AuthService,
              public userService: UserService,
              public dialog: MatDialog) {

              }
  //

  onRegisterLogin() {
    this.dialog.open(LoginComponent, {width: '25rem', height: '35rem', panelClass: 'dino-dialog'});
  }


}
