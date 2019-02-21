import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  ngOnInit() {
    let i = window.location.href.indexOf('code');
    let j  = window.location.href.indexOf('state');


    if (!this.authService.isAuthenticated() && i != -1) {
      let code = window.location.href.substring(i + 5, j-1);
      let state = window.location.href.substring(j + 6, j + 12);
      this.authService.getToken(code, state);
      console.log("Code: ", code);
    }
  }

  onLogin() {
    /*window.location.href = 'https://graph.facebook.com/oauth/authorize?client_id=' + this.authService.clientId
      + '&redirect_uri=' + this.authService.redirectUri
      + '&response_type=code';
      */
    window.location.href = 'https://www.facebook.com/v3.2/dialog/oauth?client_id=' + this.authService.clientId
      + '&response_type=code'
      + '&redirect_uri=' + this.authService.redirectUri
      + '&state=' + this.authService.state;
  }

  onLogout(){
    this.authService.logout();
  }

}
