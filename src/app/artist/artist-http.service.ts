import { HttpClient, HttpResponse } from '@angular/common/http';
import { ArtistService } from 'src/app/artist/artist.service';
import { Injectable } from "@angular/core";
import { Artist } from '../shared/artist.model';
import { map } from 'rxjs/operators';
import { Page } from '../shared/page-model';
import { UtilityService } from '../shared/utility.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ArtistHttpService {

    private path = 'http://localhost:6060/';

    constructor(private artistService: ArtistService,
                private http: HttpClient,
                private utilityService: UtilityService,
                private authService: AuthService) {}

    getAllArtists() {
        const url = this.path + 'artists';
        this.http.get<Artist[]>(url).subscribe(
          (artists: Artist[]) => {
            this.artistService.setArtists(artists);
          },
          (error) => {
            console.log('HttpService Error: ', error);
          }
        );
      }

      getArtists(page: number, size: number) {
        const url = this.path + 'artists/page/' + page + '/size/' + size;
        this.http.get<any>(url).pipe(map(
          (response: HttpResponse<any>) => {
            return this.utilityService.pageResponseMapper(response);
          }
        )).subscribe(
          (artistPage: Page) => {
            this.artistService.setArtistPage(artistPage);
          },
          (error) => {
            console.log('HttpService Error: ', error);
          }
        );
      }

      getArtist(id: number) {
        const url = this.path + 'artists/' + id;
        this.http.get<Artist>(url).subscribe(
          (artist: Artist) => {
            this.artistService.setArtist(artist);
          },
          (error) => {
            console.log('HttpService Error: ', error);
          }
        );
      }


      deleteArtist(id: number) {
        this.http.delete(this.path + 'admin/artists/' + id, this.authService.httpOptions).subscribe(
          (res) => {
            this.artistService.deleteArtist(id);
          },
          (error) => {
            console.log('ERROR: ', error);
          }
        );
      }

      updateArtist(id: number, artist: Artist) {
        this.http.put(this.path + 'admin/artists/' + id, artist, this.authService.httpOptions).subscribe(
          (res) => {
            this.artistService.updateArtist(id, artist);
          },
          (error) => {
            console.log('ERROR: ', error);
          }
        );
      }

      addArtist(artist: Artist) {
        this.http.post(this.path + 'admin/artists', artist, this.authService.httpOptions).subscribe(
          (res) => {
            this.artistService.addArtist(artist);
          },
          (error) => {
            console.log('ERROR: ', error);
          }
        );
      }


}