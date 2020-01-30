import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthError } from '../auth-error.class';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {

  loginError = new AuthError();
  height = window.innerHeight;
  subscription: Subscription;

  constructor(public authService: AuthService,
              public router: Router,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.authService.authErrorChanged.subscribe(
      (error: AuthError) => {
        this.loginError = error;
        console.log('Error: ', this.loginError.error_description);
      }
    );

  }

  onLogin(form: NgForm) {
    const username = form.value.email;
    const password = form.value.password;
    this.authService.userLogin(username, password, 'user');
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }


}
