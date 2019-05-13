import {Component, OnInit} from '@angular/core';
import {HttpService} from './shared/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dinomik-client';

  constructor(private httpService: HttpService) {}

  ngOnInit(){
    this.httpService.getArtists();
    console.log('Http service worked!!!');
    this.httpService.getEvents();
    this.httpService.getVenues();
  }
}
