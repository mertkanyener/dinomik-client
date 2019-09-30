import { HttpService } from 'src/app/shared/http.service';
import { MatDialogRef } from '@angular/material';
import { LoginResponse } from './../../shared/login-response.int';
import { LoginOptions } from './../../shared/login-options.int';
import { FacebookService } from './../../shared/facebook.service';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private fbService: FacebookService,
              private router: Router,
              private http: HttpClient,
              private cookieService: CookieService,
              public dialogRef: MatDialogRef<LoginComponent>) {
                fbService.init({
                  appId: '647358105696445',
                  version: 'v3.2',
                  xfbml: true
                });
              }

  ngOnInit() {

    // const i = window.location.href.indexOf('code');
    // const j  = window.location.href.indexOf('state');

    // if (!this.authService.isAuthenticated() && i !== -1) {
    //   const code = window.location.href.substring(i + 5, j - 1);
    //   const state = window.location.href.substring(j + 6, j + 12);
    //   this.authService.getToken(code, state);
    //   console.log('Code: ', code);
    // }
  }

  onRegister() {
    this.dialogRef.close();
  }

  onDinomikLogin() {
    this.router.navigate(['/giris-yap']);
    this.dialogRef.close();

  }

  onFacebookLogin() {
    const options: LoginOptions = {
      scope: 'public_profile,email,user_friends',
      return_scopes: true,
      enable_profile_selector: true
    };

    this.fbService.login(options)
      .then((res: LoginResponse) => {
        console.log('Login successful: ', res);
        this.cookieService.set('access_token', res.authResponse.accessToken, null, null, null, null, null);
        this.http.get('https://graph.facebook.com/me', { params:
        { fields: 'first_name,last_name,email', access_token: this.cookieService.get('access_token') }}).subscribe(
          (response: any) => {
            console.log('Response: ', response);
            this.authService.doesEmailExist(response.email).then(value => {
              if (value === 'newUser') {
                const user = new User();
                user.firstName = response.first_name;
                user.lastName = response.last_name;
                user.password = '123456';
                user.facebookUser = true;
                user.email = response.email;
                this.authService.registerUser(user);
              }
            });
          },
          (error) =>{
            console.log('HTTP ERROR: ', error);
          }
        );
        this.authService.facebookLogin();
        this.dialogRef.close();
      })
      .catch((error) => {
        console.log('Login ERROR: ', error);
      });

    // window.location.href = 'https://www.facebook.com/v3.2/dialog/oauth?client_id=' + this.authService.clientId
    //   + '&response_type=code'
    //   + '&redirect_uri=' + this.authService.redirectUri
    //   + '&state=' + this.authService.state;
  }

  onLogout() {
    this.authService.logout();
  }

}
