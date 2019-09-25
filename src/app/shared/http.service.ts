import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';

@Injectable()
export class HttpService {

  private path = 'http://localhost:6060/';

  constructor(private http: HttpClient,
              private authService: AuthService) {

  }

  uploadImage(image: File, type: string, name: string): number {

    let status: number;
    const req = new HttpRequest('POST', this.path + 'admin/images/' + type, image, this.authService.httpOptions );
    this.http.request(req).pipe(map(
      (res: HttpResponse<any>) => {
        status = res.status;
        console.log('Status: ', status);
      }
   )).subscribe(
      (resp) => {
        console.log('Image uploaded successfully!');
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );

    return status;
  }


}
