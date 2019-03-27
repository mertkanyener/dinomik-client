import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    if (this.authService.adminMode){
      this.router.navigate(['home'], {relativeTo: this.route });
    }
  }

  onLogin(form: NgForm){
    this.authService.adminLogin(form.value.username, form.value.password);
    this.router.navigate(['home'], {relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['/']);
  }

}
