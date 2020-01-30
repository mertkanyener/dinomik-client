import { AuthError } from './../../auth/auth-error.class';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  loginError = new AuthError();
  subscription: Subscription;

  constructor(public authService: AuthService,
              public router: Router,
              public route: ActivatedRoute) { }

  ngOnInit() {
    if (this.authService.isAdmin()){
      console.log('Admin!');
      this.router.navigate(['home'], {relativeTo: this.route });
    }
    this.subscription = this.authService.authErrorChanged.subscribe(
      (error: AuthError) => {
        this.loginError = error;
      }
    );
  }

  onLogin(form: NgForm) {
    this.authService.userLogin(form.value.username, form.value.password, 'admin');
    this.router.navigate(['home'], {relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
