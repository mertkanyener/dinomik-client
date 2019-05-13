import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    const i = window.location.href.indexOf('code');
    const j  = window.location.href.indexOf('state');


    if (!this.authService.isAuthenticated() && i !== -1) {
      const code = window.location.href.substring(i + 5, j - 1);
      const state = window.location.href.substring(j + 6, j + 12);
      this.authService.getToken(code, state);
      console.log('Code: ', code);
    }
  }

  onLogin() {
    window.location.href = 'https://www.facebook.com/v3.2/dialog/oauth?client_id=' + this.authService.clientId
      + '&response_type=code'
      + '&redirect_uri=' + this.authService.redirectUri
      + '&state=' + this.authService.state;
  }

  onLogout(){
    this.authService.logout();
  }

}
