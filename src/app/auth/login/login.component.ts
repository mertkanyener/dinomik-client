import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    (window as any) .fbAsyncInit = function() {
      FB.init({
        appId : '647358105696445',
        cookie : true,
        xfbml : true,
        version : 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));

    // const i = window.location.href.indexOf('code');
    // const j  = window.location.href.indexOf('state');


    // if (!this.authService.isAuthenticated() && i !== -1) {
    //   const code = window.location.href.substring(i + 5, j - 1);
    //   const state = window.location.href.substring(j + 6, j + 12);
    //   this.authService.getToken(code, state);
    //   console.log('Code: ', code);
    // }
  }

  onLogin() {
    FB.login((response) =>
      {
        if (response.authResponse) {
          this.authService.saveToken(response.authResponse.accessToken);
          console.log('Access Token: ', response.authResponse.accessToken);
          this.router.navigate(['/']);
        } else {
          alert('Facebook login failed!');
        }
      }, { scope: 'public_profile,email' }
    );

    // window.location.href = 'https://www.facebook.com/v3.2/dialog/oauth?client_id=' + this.authService.clientId
    //   + '&response_type=code'
    //   + '&redirect_uri=' + this.authService.redirectUri
    //   + '&state=' + this.authService.state;
  }

  onLogout(){
    this.authService.logout();
  }

}
