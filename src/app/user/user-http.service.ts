import { AuthService } from '../auth/auth.service';
import { Genre } from '../shared/genre.interface';
import { Artist } from '../shared/artist.model';
import { Event } from '../shared/event.model';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';

@Injectable()
export class UserHttpService {

    private path = 'http://localhost:6060/user/';

    constructor(public cookieService: CookieService,
                public http: HttpClient,
                public userService: UserService,
                public authService: AuthService) {}

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
                console.log('User http : ', user);
                this.userService.setUser(user);
            },
            (error: HttpErrorResponse) => {
                console.log('UserHttpService error: ', error);
                this.handleError(error).then(value => { 
                    if (value === 'tokenRefresh') {
                        this.getUser(id);
                    }
                 });
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
                this.handleError(error);
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
                this.handleError(error);
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
                this.handleError(error);
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
                this.handleError(error);
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
                this.handleError(error);
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
                this.handleError(error);
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
                this.handleError(error);
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
                this.handleError(error);
            }
        );
    }

    handleError(error: HttpErrorResponse): Promise<any> {
        let result: Promise<any>;
        if (error.error.error === 'invalid_token') {
            result = this.authService.refreshToken();
        }
        return result;
    }



}