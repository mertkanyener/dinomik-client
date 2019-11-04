import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { UserHttpService } from '../user/user-http.service';
import { User } from '../shared/user.model';
import { CookieService } from 'ngx-cookie-service';

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

  user: User;
  links: Link[] = [
    {name: 'Etkinlikler', url: ''},
    {name: 'Sanatçılar', url: 'sanatcilar'},
    {name: 'Mekanlar', url: 'mekanlar'}
  ];
  activeLink: Link;
  searchValue = '';
  constructor(public authService: AuthService,
              public userService: UserService,
              public userHttpService: UserHttpService,
              public cookieService: CookieService,
              public router: Router,
              public route: ActivatedRoute) { }

  ngOnInit() {
    if (this.authService.isAuthenticated() && this.userService.getUser() === undefined) {
      this.userHttpService.getUser(this.cookieService.get('userId'));
    }
    this.user = this.userService.getUser();
    this.userService.userChanged.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
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

  isAdminView(): boolean {
    const arr = window.location.pathname.split('/');
    return arr[1] === 'admin';
  }
  

}
