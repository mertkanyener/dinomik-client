import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {AuthService} from "../auth/auth.service";
import {LoginComponent} from "../auth/login/login.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()){
      const dialogRef = this.dialog.open(LoginComponent, {width: "20rem", height: "20rem"});
    }

  }

}
