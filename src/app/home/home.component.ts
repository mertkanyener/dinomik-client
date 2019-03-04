import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {AuthService} from "../auth/auth.service";
import {LoginComponent} from "../auth/login/login.component";
import {DatePipe} from '@angular/common';

const months : String[] = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık'
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentMonth : string;
  date : number;

  days = [1, 2, 3, 4, 5, 6, 7];


  constructor(public dialog: MatDialog,
              public authService: AuthService) { }

  ngOnInit() {
    this.date = Date.now();
    console.log("Date: ", this.date);
    if (!this.authService.isAuthenticated()){
      const dialogRef = this.dialog.open(LoginComponent, {width: "20rem", height: "20rem"});
    }
  }



}
