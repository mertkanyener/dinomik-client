import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

  }

  onLogin(form: NgForm) {
    const username = form.value.email;
    const password = form.value.password;
    this.authService.userLogin(username, password, 'user');
  }

  onCancel() {
    this.router.navigate(['/']);
  }

}
