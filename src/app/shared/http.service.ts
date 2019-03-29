import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ArtistService} from 'src/app/artist/artist.service';
import {EventService} from 'src/app/event/event.service';
import {VenueService} from 'src/app/venue/venue.service';
import {Artist} from './artist.model';
import {Event} from './event.model';
import {Venue} from './venue.model';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class HttpService {

  private path = 'http://localhost:8080/';

  constructor(private http: HttpClient,
              private artistService: ArtistService,
              private eventService: EventService,
              private venueService: VenueService,
              private authService: AuthService){

  }


  // Artist Operations

  getArtists(){
    this.http.get<Artist[]>(this.path + 'artists').subscribe(
      (artists) => {
        this.artistService.setArtists(artists);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  }

  deleteArtist(id: number){
    this.http.delete(this.path + 'admin/artists/' + id, this.authService.httpOptions).subscribe(
      (res) => {
        this.artistService.deleteArtist(id);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  }

  updateArtist(id: number, artist: Artist){
    this.http.put(this.path + 'admin/artists/' + id, artist, this.authService.httpOptions).subscribe(
      (res) => {
        this.artistService.updateArtist(id, artist);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  }

  addArtist(artist: Artist){
    this.http.post(this.path + 'admin/artists', artist, this.authService.httpOptions).subscribe(
      (res) => {
        this.artistService.addArtist(artist);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  }

  // Event Operations

  getEvents(){
    this.http.get<Event[]>(this.path + 'events').subscribe(
      (events) => {
        this.eventService.setEvents(events);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  }

  deleteEvent(id: number){

    this.http.delete(this.path + 'admin/events/' + id, this.authService.httpOptions).subscribe(
      (res) => {
        this.eventService.deleteEvent(id);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  }

  updateEvent(id: number, event: Event){
    this.http.put(this.path + 'admin/events/' + id, event, this.authService.httpOptions).subscribe(
      (res) => {
        this.eventService.updateEvent(id, event);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  }

  addEvent(event: Event){
    this.http.post(this.path + 'admin/events/', event, this.authService.httpOptions).subscribe(
      (res) => {
        this.eventService.addEvent(event);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  }


  // Venue Operations

  getVenues(){
    this.http.get<Venue[]>(this.path + 'venues').subscribe(
      (venues) => {
        this.venueService.setVenues(venues);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  }

  deleteVenue(id: number){
    this.http.delete(this.path + 'admin/venues/' + id, this.authService.httpOptions).subscribe(
      (res) => {
        this.venueService.deleteVenue(id);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  }

  updateVenue(id: number, venue: Venue){
    this.http.put(this.path + 'admin/venues/' + id, venue, this.authService.httpOptions).subscribe(
      (res) => {
        this.venueService.updateVenue(id, venue);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    );
  }

  addVenue(venue: Venue){
    this.http.post(this.path + 'admin/venues', venue, this.authService.httpOptions).subscribe(
      (res) => {
        this.venueService.addVenue(venue);
      },
      (error) => {
        console.log("ERROR: ", error);
      }
    )
  }


}
