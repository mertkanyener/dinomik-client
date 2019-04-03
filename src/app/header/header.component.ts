import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';

export interface Link {

  name : string;
  url : string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  links: Link[] = [
    {name: 'Etkinlikler', url: ''},
    {name: 'Sanatçılar', url: 'sanatcilar'},
    {name: 'Mekanlar', url: 'mekanlar'}
  ];
  activeLink = this.links[0];
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
