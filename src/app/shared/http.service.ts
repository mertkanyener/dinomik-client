import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class HttpService {

  private path = 'http://localhost:6060/';

  constructor(public http: HttpClient,
              public authService: AuthService ) {

  }

  uploadImage(image: File, type: string, id: number): string {
    let result = 'failed';
    const url = this.path + type + '/' + id;
    const formData = new FormData();
    formData.append('image', image);
    this.http.post(url, formData, {headers: this.authService.getAdminHeaders()}).subscribe(
      (fileName: string) => {
        result = fileName;
      },
      (error) => {
        console.log('HttpService error: ', error);
      }
    );
    return result;
  }


}
