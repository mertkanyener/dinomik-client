import { Genre } from './../shared/genre.interface';
import { Artist } from './../shared/artist.model';
import { Event } from './../shared/event.model';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';

@Injectable()
export class UserHttpService {

    private path = 'http://localhost:6060/user/';

    constructor(private cookieService: CookieService,
                private http: HttpClient,
                private userService: UserService) {}

    //ASFSDF

    getHeaders(): HttpHeaders {
        const headers = new HttpHeaders(
            { 'Authorization': 'Bearer ' + this.cookieService.get('dino_access_token') }
        );

        return headers;
    }

    getUser(id: string) {
        this.http.get<User>(this.path + id, { headers: this.getHeaders() }).subscribe(
            (user: User) => {
                this.userService.setUser(user);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
            }
        );
    }

    addSavedEvent(event: Event) {
        const url = this.path + this.cookieService.get('userId') + '/events/saved/' + event.id;
        this.http.post(url, null, { headers: this.getHeaders() }).subscribe(
            (res) => {
                this.userService.addSavedEvent(event);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
            }
        );
    }

    addAttendingEvent(event: Event) {
        const url = this.path + this.cookieService.get('userId') + '/events/attending/' + event.id;
        this.http.post(url, null, { headers: this.getHeaders() } ).subscribe(
            (res) => {
                this.userService.addAttendingEvent(event);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
            }
        );
    }

    addLikedArtist(artist: Artist) {
        const url = this.path + this.cookieService.get('userId') + '/artists/' + artist.id;
        this.http.post(url, null, { headers: this.getHeaders() }).subscribe(
            (res) => {
                this.userService.addLikedArtist(artist);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
            }
        );
    }

    addLikedGenre(genre: Genre) {
        const url = this.path + this.cookieService.get('userId') + '/genres/' + genre.id;
        this.http.post(url, null, { headers: this.getHeaders() }).subscribe(
            (res) => {
                this.userService.addLikedGenre(genre);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
            }
        );
    }

    deleteSavedEvent(id: number) {
        const url = this.path + this.cookieService.get('userId') + '/events/saved/' + id;
        this.http.delete(url, { headers: this.getHeaders() }).subscribe(
            (res) => {
                this.userService.removeSavedEvent(id);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
            }
        );
    }

    deleteAttendingEvent(id: number) {
        const url = this.path + this.cookieService.get('userId') + '/events/attending/' + id;
        this.http.delete(url, { headers: this.getHeaders() }).subscribe(
            (res) => {
                this.userService.removeAttendingEvent(id);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
            }
        );
    }

    deleteLikedArtist(id: number) {
        const url = this.path + this.cookieService.get('userId') + '/artists/' + id;
        this.http.delete(url, { headers: this.getHeaders() }).subscribe(
            (res) => {
                this.userService.removeLikedArtist(id);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
            }
        );
    }

    deleteLikedGenre(id: number) {
        const url = this.path + this.cookieService.get('userId') + '/genres/' + id;
        this.http.delete(url, { headers: this.getHeaders() }).subscribe(
            (res) => {
                this.userService.removeLikedGenre(id);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
            }
        );
    }

}