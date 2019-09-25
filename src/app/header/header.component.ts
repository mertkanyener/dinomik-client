import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';

export interface Link {

  name: string;
  url: string;
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
  activeLink: Link;
  searchValue = '';
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    const path = window.location.pathname;
    if (path === '/sanatcilar') {
      this.activeLink = this.links[1];
    } else if (path === '/mekanlar') {
      this.activeLink = this.links[2];
    } else {
      this.activeLink = this.links[0];
    }
  }

  onSearch(name: string) {
    const url = 'arama-sonuclari/' + name;
    this.router.navigate([url]);
  }

}
