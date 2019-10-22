import { User } from './../shared/user.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthError } from './auth-error.class';
import { UserHttpService } from '../user/user-http.service';
import { resolve, reject } from 'q';

export interface Token {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  userId: number;
}

@Injectable()
export class AuthService{

  private path = 'http://localhost:6060/';
  status = new Subject<number>();
  authError = new Subject<AuthError>();

  httpOptions: any;
  adminMode = false;

  constructor(public http: HttpClient,
              public router: Router,
              public cookieService: CookieService) {}


  //Methods

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders(
        { 'Authorization': 'Bearer ' + this.cookieService.get('dino_access_token') }
    );

    return headers;
}

  registerUser(user: User) {
    this.http.post(this.path + 'register', user).subscribe(
      (res) => {
        console.log('Register successful: ', res);
      },
      (error) => {
        console.log('RegisterError: ', error);
      }
    );
  }

  getToken(code: string, state: string) {

    const url = this.path + 'facebook?code=' + code + '&state=' + state;

    this.http.get(url).subscribe(
      (res) => {
        console.log('Token: ', res);
      },
      (err) => {
        console.log('ERROR: ', err);
      }
    );
  }

  userLogin(username: string, password: string, userType: string) {
    let params;
    if (password === null) {
      params = new HttpParams().set('username', username);
    } else {
      params = new HttpParams().set('username', username).append('password', password);
    }
    const request = new HttpRequest('GET',
      this.path + 'login',
      null,
      {params: params, responseType: 'text'});
    this.http.request(request).pipe(map(
      (response: HttpResponse<any>) => {
        const body = response['body'];
        const token: Token = JSON.parse(body || '{}');
        return token;
      }
    )).subscribe(
      (token) => {
        if (token.access_token !== undefined) {
            this.saveToken('dino_access_token', token.access_token);
            this.saveToken('dino_refresh_token', token.refresh_token);
            this.cookieService.set('userId', token.userId.toString());
            console.log('Token: ', this.cookieService.get('dino_access_token'));
            location.reload();
        }
      },
      (error) => {
        const loginError: AuthError = JSON.parse(error['error']);
        this.authError.next(loginError);
      }
    );
  }

  refreshToken(): Promise<any> {
    const url = this.path + 'login/refresh_token';
    const params = new HttpParams().set('refreshToken', this.cookieService.get('dino_refresh_token'));
    const promise = new Promise<any>((resolve, reject) => {
      this.http.get<Token>(url, { params: params }).toPromise().then(
        (token: Token) => {
          this.saveToken('dino_access_token', token.access_token);
          resolve('tokenRefresh');
        }
      );
    });
    return promise;
  }

  saveToken(tokenName: string, token: string) {
    this.cookieService.set(tokenName, token, null, null, null, null, null);
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('dino_access_token');
  }

  isAdmin(): boolean {
    return this.cookieService.check('admin_access_token');
  }

  logout(){
    this.cookieService.delete('dino_access_token');
    window.location.reload();
  }

  adminLogout() {
    this.cookieService.delete('admin_access_token');
    this.cookieService.delete('admin_refresh_token');
    this.router.navigate(['admin']);
  }

  setAuthHeaders(userType: string) {
    if (userType === 'admin') {
      this.httpOptions = {
        headers: new HttpHeaders(
          {'Authorization': 'Bearer' + this.cookieService.get('admin_access_token')}
        )
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders(
          {'Authorization': 'Bearer' + this.cookieService.get('dino_access_token')}
        )
      };
    }
  }

//Validations

doesEmailExist(email: string): Promise<any> {
  const path = this.path + 'validation/email/' + email;
  const promise = new Promise<any>((resolve, reject) => {
    this.http.get<number>(path).toPromise().then(
      (res) => {
        if (res === 1) {
          resolve({'emailExists': true});
        } else {
          resolve();
        }
      }
    );
  });
  return promise;
}

doesEmailExist2(email: string): Promise<any> {
  const path = this.path + 'validation/email/' + email;
  const promise = new Promise<any>((resolve, reject) => {
    this.http.get<number>(path).toPromise().then(
      (res) => {
        if (res === 1) {
          resolve('emailExists');
        } else {
          resolve('newUser');
        }
      }
    );
  });
  return promise;
}

}
