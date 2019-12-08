import { EventService } from 'src/app/event/event.service';
import { Friend } from './../shared/friend.model';
import { AuthService } from '../auth/auth.service';
import { Genre } from '../shared/genre.interface';
import { Artist } from '../shared/artist.model';
import { Event } from '../shared/event.model';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';

@Injectable()
export class UserHttpService {

    private path = 'http://localhost:6060/user/';

    constructor(public cookieService: CookieService,
                public http: HttpClient,
                public userService: UserService,
                public authService: AuthService,
                public eventService: EventService) {}

    //ASFSDF

    getUser(id: string, type: string) {
        this.http.get<User>(this.path + id, { headers: this.authService.getHeaders() }).subscribe(
            (user: User) => {
                console.log('User http : ', user);
                this.userService.setUser(user, type);
            },
            (error: HttpErrorResponse) => {
                console.log('UserHttpService error: ', error);
                this.handleError(error).then(value => {
                    if (value === 'tokenRefresh') {
                        this.getUser(id, type);
                    }
                 });
            }
        );
    }

    getFriends() {
        const url = this.path + this.cookieService.get('userId') + '/friends';
        this.http.get<Friend[]>(url, { headers: this.authService.getHeaders() }).subscribe(
            (friends: Friend[]) => {
                this.userService.setFriends(friends);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
                this.handleError(error);
            }
        );

    }

    getFriend(id: number) {
        const url = this.path + 'friends/find/' + id;
        this.http.get<Friend>(url, { headers: this.authService.getHeaders()}).subscribe(
            (friend: Friend) => {
                this.userService.setFriend(friend);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
                this.handleError(error);
            }
        );
    }

    searchFriends(firstName: string, lastName: string) {
        const url = this.path + 'friends/find';
        const params = new HttpParams().set('firstName', firstName)
            .append('lastName', lastName)
            .append('userId', this.cookieService.get('userId'));
        this.http.get<Friend[]>(url, { headers: this.authService.getHeaders(), params: params }).subscribe(
            (friends: Friend[]) => {
                this.userService.setSearchFriends(friends);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
                this.handleError(error);
            }
        );
    }

    addSavedEvent(event: Event) {
        const url = this.path + this.cookieService.get('userId') + '/events/saved/' + event.id;
        this.http.post(url, null, { headers: this.authService.getHeaders() }).subscribe(
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
        this.http.post(url, null, { headers: this.authService.getHeaders() } ).subscribe(
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
        this.http.post(url, null, { headers: this.authService.getHeaders() }).subscribe(
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
        this.http.post(url, null, { headers: this.authService.getHeaders() }).subscribe(
            (res) => {
                this.userService.addLikedGenre(genre);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
                this.handleError(error);
            }
        );
    }

    addFriend(friend: Friend) {
        const url = this.path + this.cookieService.get('userId') + '/friends/add/' + friend.id;
        this.http.post(url, null, { headers: this.authService.getHeaders() }).subscribe(
            (res) => {
                this.userService.addFriend(friend);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
                this.handleError(error);
            }
        );
    }

    saveImage(image: File) {
        const url = this.path + this.cookieService.get('userId') + '/image/save';
        const formData = new FormData();
        formData.append('image', image);
        this.http.post(url, formData, {headers: this.authService.getHeaders(), responseType: 'text'}).subscribe(
            (fileName: any) => {
                console.log('Fİle name: ', fileName);
                this.userService.saveImage('http://localhost:9999/images/users/' + fileName);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
            }
        );
    }

    deleteFriend(id: number) {
        const url = this.path + this.cookieService.get('userId') + '/friends/delete/' + id;
        this.http.delete(url, { headers: this.authService.getHeaders() }).subscribe(
            (res) => {
                this.userService.removeFriend(id);
            },
            (error) => {
                console.log('UserHttpService error: ', error);
                this.handleError(error);
            }
        );
    }


    deleteSavedEvent(id: number) {
        const url = this.path + this.cookieService.get('userId') + '/events/saved/' + id;
        this.http.delete(url, { headers: this.authService.getHeaders() }).subscribe(
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
        this.http.delete(url, { headers: this.authService.getHeaders() }).subscribe(
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
        this.http.delete(url, { headers: this.authService.getHeaders() }).subscribe(
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
        this.http.delete(url, { headers: this.authService.getHeaders() }).subscribe(
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