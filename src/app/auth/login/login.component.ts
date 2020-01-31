import { Subscription } from 'rxjs';
import { AuthError } from './../auth-error.class';
import { NgForm } from '@angular/forms';
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

  dinoLogin = false;
  loginError = new AuthError();
  subscription: Subscription;

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

  onRegister() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.subscription = this.authService.authErrorChanged.subscribe(
      (error: AuthError) => {
        this.loginError = error;
      }
    );
  }

  onDinomikLogin() {
    this.dinoLogin = true;
  }

  onLogin(form: NgForm) {
    const username = form.value.email;
    const password = form.value.password;
    this.authService.userLogin(username, password, 'user');
  }

  onCancel() {
    this.dinoLogin = false;
  }

  onFacebookLogin() {
    const options: LoginOptions = {
      scope: 'public_profile,email,user_friends',
      return_scopes: true,
      enable_profile_selector: true
    };
    const url = 'https://graph.facebook.com/me';
    const testUrl = 'https://graph.facebook.com/';

    this.fbService.login(options)
      .then((res: LoginResponse) => {
        console.log('Login successful: ', res);
        this.cookieService.set('access_token', res.authResponse.accessToken, null, null, null, null, null);
        this.http.get(testUrl + res.authResponse.userID, { params:
        { fields: 'first_name,last_name,email,friends,picture', access_token: this.cookieService.get('access_token') }}).subscribe(
          (response: any) => {
            console.log('Response: ', response);
            const email: string = response.email;
            this.authService.doesEmailExist2(response.email).then(value => {
              if (value === 'newUser') {
                const user = new User();
                user.id = response.id;
                user.firstName = response.first_name;
                user.lastName = response.last_name;
                user.facebookUser = true;
                user.email = response.email;
                user.image = 'https://graph.facebook.com/' + response.id + '/picture';
                user.startDate = new Date().toISOString().split('T')[0];
                this.authService.registerUser(user);
              }
              this.authService.userLogin(email, null, 'fbUser');
            });
          },
          (error) =>{
            console.log('HTTP ERROR: ', error);
          }
        );
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
