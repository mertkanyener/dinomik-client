import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'dinomik-client';

  constructor(public authService: AuthService,
              public userService: UserService) {}


  ngOnInit(){
    
  }

}
