import { Event } from 'src/app/shared/event.model';
import { Genre } from '../shared/genre.interface';
import { Artist } from '../shared/artist.model';
import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { Subject } from 'rxjs';
import { EventService } from '../event/event.service';

@Injectable()
export class UserService {

    private user: User;
    userChanged = new Subject<User>();

    constructor(public eventService: EventService) {}

    setUser(user: User) {
        this.user = user;
        this.user.savedEvents = this.eventService.translateEventDates(this.user.savedEvents);
        this.user.attendingEvents = this.eventService.translateEventDates(this.user.attendingEvents);
        this.userChanged.next(this.user);
    }

    addSavedEvent(event: Event) {
        this.user.savedEvents.push(event);
        this.userChanged.next(this.user);
    }

    removeSavedEvent(id: number) {
        const index = this.user.savedEvents.indexOf(this.user.savedEvents.find(x => x.id === id));
        this.user.savedEvents.splice(index, 1);
        this.userChanged.next(this.user);
    }

    addAttendingEvent(event: Event) {
        this.user.attendingEvents.push(this.eventService.translateSingleEventDate(event));
        this.userChanged.next(this.user);
    }

    removeAttendingEvent(id: number) {
        const index = this.user.attendingEvents.indexOf(this.user.attendingEvents.find(x => x.id === id));
        this.user.attendingEvents.splice(index, 1);
        this.userChanged.next(this.user);
    }

    addLikedArtist(artist: Artist) {
        this.user.likedArtists.push(artist);
        this.userChanged.next(this.user);
    }

    removeLikedArtist(id: number) {
        const index = this.user.likedArtists.indexOf(this.user.likedArtists.find(x => x.id === id));
        this.user.likedArtists.splice(index, 1);
        this.userChanged.next(this.user);
    }

    addLikedGenre(genre: Genre) {
        this.user.likedGenres.push(genre);
        this.userChanged.next(this.user);
    }

    removeLikedGenre(id: number) {
        const index = this.user.likedGenres.indexOf(this.user.likedGenres.find(x => x.id === id));
        this.user.likedGenres.splice(index, 1);
        this.userChanged.next(this.user);
    }

    isSavedEvent(id: number): boolean {
        return this.user.savedEvents.find(x => x.id === id) !== undefined;
    }

    isAttendingEvent(id: number): boolean {
        return this.user.attendingEvents.find(x => x.id === id) !== undefined;
    }

    isLikedArtist(id: number): boolean {
        return this.user.likedArtists.find(x => x.id === id) !== undefined;
    }

    getUser(): User {
        return this.user;
    }

    

}