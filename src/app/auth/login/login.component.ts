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
    if (!this.authService.isAuthenticated() && i != -1) {
      this.authService.getToken(window.location.href.substring(i + 5));
    }
  }

  onLogin() {
    /*window.location.href = 'https://graph.facebook.com/oauth/authorize?client_id=' + this.authService.clientId
      + '&redirect_uri=' + this.authService.redirectUri
      + '&response_type=code';
      */
    window.location.href = 'http://localhost:8080/login?client_id=' + this.authService.clientId
      + '&response_type=code'
      + '&redirect_uri=' + this.authService.redirectUri;
  }

  onLogout(){
    this.authService.logout();
  }

}
