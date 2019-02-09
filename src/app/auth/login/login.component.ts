import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onLogin(){
    this.http.get('http://localhost:8080/login/facebook').subscribe(
      (res) => {
        console.log("Logging in");
      },
      (err) => {
        console.log("An error occured");
      }
    );
  }

}
