import { Friend } from './../shared/friend.model';
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
    private otherUser: User;
    private friends = new Array<Friend>();
    private searchFriends: Friend[];
    private friend: Friend;
    private attendingFriends: Friend[];
    userChanged = new Subject<User>();
    friendsChanged = new Subject<Friend[]>();
    searchFriendsChanged = new Subject<Friend[]>();
    otherUserChanged = new Subject<User>();
    friendChanged = new Subject<Friend>();
    attendingFriendsChanged = new Subject<Friend[]>();

    constructor(public eventService: EventService) {}

    setUser(user: User, type: string) {
        user.savedEvents = this.eventService.translateEventDates(user.savedEvents);
        user.attendingEvents = this.eventService.translateEventDates(user.attendingEvents);
        if (type === 'other') {
            this.otherUser = user;
            this.otherUserChanged.next(this.otherUser);
        } else {
            this.user = user;
            this.userChanged.next(this.user);
        }
    }
   
    setFriends(friends: Friend[]) {
        this.friends = friends;
        this.friendsChanged.next(this.friends.slice());
    }

    setAttendingFriends(friends: Friend[]) {
        this.attendingFriends = friends;
        this.attendingFriendsChanged.next(this.attendingFriends.slice());
    }

    setFriend(friend: Friend) {
        this.friend = friend;
        this.friendChanged.next(this.friend);
    }

    setSearchFriends(friends: Friend[]) {
        this.searchFriends = friends;
        this.searchFriendsChanged.next(this.searchFriends.slice());
    }

    addFriend(friend: Friend) {
        this.friends.push(friend);
        this.user.friends.push(friend.id);
        this.userChanged.next(this.user);
        this.friendsChanged.next(this.friends.slice());
    }

    addSavedEvent(event: Event) {
        this.user.savedEvents.push(event);
        this.userChanged.next(this.user);
    }

    saveImage(imageUrl: string) {
        this.user.image = imageUrl;
        this.userChanged.next(this.user);
    }

    removeFriend(id: number) {
        const index = this.friends.indexOf(this.friends.find(x => x.id === id));
        const indexId = this.user.friends.indexOf(id);
        this.friends.splice(index, 1);
        this.user.friends.splice(indexId, 1);
        this.friendsChanged.next(this.friends.slice());
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

    isFriend(id: number): boolean {
        return this.user.friends.find(x => x === id) !== undefined;
    }

    getUser(): User {
        return this.user;
    }

    getFriends(): Friend[] {
        return this.friends;
    }

    

}