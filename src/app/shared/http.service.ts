import { reject } from 'q';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

export interface UploadFileResponse {
  fileName: string;
  filePath: string;
  fileType: string;
  size: number;
}

@Injectable()
export class HttpService {

  private path = 'http://localhost:6060/';

  constructor(public http: HttpClient,
              public authService: AuthService ) {

  }

  uploadImage(image: File, type: string, id: number): Promise<any> {
    const url = this.path + 'admin/images/' + type + '/' + id;
    const formData = new FormData();
    formData.append('file', image);
    const promise = new Promise<any>((resolve, reject) => {
      this.http.post(url, formData, {headers: this.authService.getAdminHeaders()}).subscribe(
        (res: UploadFileResponse) => {
          resolve(res.fileName);
        },
        (error) => {
          console.log('HttpService error: ', error);
        }
      );
    });

    return promise;
  }


}
