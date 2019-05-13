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

  loginStatus = 0;
  loginClicked = false;
  subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.authService.status.subscribe(
      (status) => {
        this.loginStatus = status;
      }
    );
    if (this.authService.adminMode){
      this.router.navigate(['home'], {relativeTo: this.route });
    }
  }

  onLogin(form: NgForm) {
    this.loginClicked = true;
    this.authService.adminLogin(form.value.username, form.value.password);
    console.log('Error status: ', this.loginStatus);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
