import { environment } from './../../environments/environment';
import { HttpService } from './../shared/http.service';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ArtistService } from 'src/app/artist/artist.service';
import { Injectable } from '@angular/core';
import { Artist } from '../shared/artist.model';
import { map } from 'rxjs/operators';
import { Page } from '../shared/page-model';
import { UtilityService } from '../shared/utility.service';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { AdminHttpResponse } from '../shared/admin-http-response.int';

@Injectable()
export class ArtistHttpService {

    private path = environment.apiUrl;
    private imageServerPath = this.path + 'images/aritsts/';

    showSpinner = false;
    response = new Subject<HttpResponse<AdminHttpResponse>>();

    constructor(public artistService: ArtistService,
                public http: HttpClient,
                public utilityService: UtilityService,
                public authService: AuthService,
                public httpService: HttpService) {}

    getAllArtists() {
        this.showLoadingSpinner();
        const url = this.path + 'artists';
        this.http.get<Artist[]>(url).subscribe(
          (artists: Artist[]) => {
            this.artistService.setArtists(artists);
            this.hideLoadingSpinner();
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
        this.http.delete(this.path + 'admin/artists/' + id, {headers: this.authService.getAdminHeaders()}).subscribe(
          (res) => {
            this.artistService.deleteArtist(id);
          },
          (error) => {
            console.log('ERROR: ', error);
          }
        );
      }

      updateArtist(id: number, artist: Artist, image?: File) {
        if (image !== null && image !== undefined) {
          this.httpService.uploadImage(image, 'artist', id).then(value => {
            artist.image = this.imageServerPath + value;
            console.log('Artist image: ', artist.image);
          });
        }
        this.http.put(this.path + 'admin/artists/' + id, artist, {headers: this.authService.getAdminHeaders()}).subscribe(
          (response: AdminHttpResponse) => {
            if (this.artistService.getArtists() !== undefined) {
              this.artistService.updateArtist(id, artist);
            }
            alert('SUCCESS: ' + response.responseBody);
          },
          (error: HttpErrorResponse) => {
            alert('ERROR: ' + error.error.responseBody);
            console.log('ERROR: ', error);
          }
        );
      }

      addArtist(artist: Artist, image?: File) {
        this.http.post(this.path + 'admin/artists', artist, {headers: this.authService.getAdminHeaders()}).subscribe(
          (response: AdminHttpResponse) => {
            artist.id = response.objectId;
            if (image !== null && image !== undefined) {
              this.httpService.uploadImage(image, 'artist', artist.id).then(value => {
                artist.image = this.imageServerPath + value;
              });
            }
            if (this.artistService.getArtists() !== undefined) {
              this.artistService.addArtist(artist);
            }
            alert('SUCCESS: ' + response.responseBody);
          },
          (errorResponse: HttpErrorResponse) => {
            alert('ERROR: ' + errorResponse.error.responseBody);
          }
        );
      }

      showLoadingSpinner() {
        this.showSpinner = true;
      }
    
      hideLoadingSpinner() {
        this.showSpinner = false;
      }


}