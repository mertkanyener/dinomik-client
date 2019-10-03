import { Genre } from './../shared/genre.interface';
import { Artist } from './../shared/artist.model';
import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { Subject } from 'rxjs';
import { Event } from '../shared/event.model';

@Injectable()
export class UserService {

    private user: User;
    userChanged = new Subject<User>();

    setUser(user: User) {
        this.user = user;
        this.userChanged.next(this.user);
    }

    addSavedEvent(event: Event) {
        this.user.savedEvents.push(event);
        this.userChanged.next(this.user);
    }

    removeSavedEvent(id: number) {
        const index = this.user.savedEvents.indexOf(this.user.savedEvents.find(x => x.id === id));
        this.user.savedEvents.slice(index, 1);
        this.userChanged.next(this.user);
    }

    addAttendingEvent(event: Event) {
        this.user.attendingEvents.push(event);
        this.userChanged.next(this.user);
    }

    removeAttendingEvent(id: number) {
        const index = this.user.attendingEvents.indexOf(this.user.attendingEvents.find(x => x.id === id));
        this.user.attendingEvents.slice(index, 1);
        this.userChanged.next(this.user);
    }

    addLikedArtist(artist: Artist) {
        this.user.likedArtists.push(artist);
        this.userChanged.next(this.user);
    }

    removeLikedArtist(id: number) {
        const index = this.user.likedArtists.indexOf(this.user.likedArtists.find(x => x.id === id));
        this.user.likedArtists.slice(index, 1);
        this.userChanged.next(this.user);
    }

    addLikedGenre(genre: Genre) {
        this.user.likedGenres.push(genre);
        this.userChanged.next(this.user);
    }

    removeLikedGenre(id: number) {
        const index = this.user.likedGenres.indexOf(this.user.likedGenres.find(x => x.id === id));
        this.user.likedGenres.slice(index, 1);
        this.userChanged.next(this.user);
    }



    getUser(): User {
        return this.user;
    }

    

}