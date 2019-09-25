import { User } from './../shared/user.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FacebookService } from '../shared/facebook.service';

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
  clientId = '647358105696445';
  redirectUri = 'http://localhost:4200/';
  state = 'yr6VZn';

  httpOptions: any;
  adminMode = false;

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService,
              private fbService: FacebookService) {}


  //Methods

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
    const params = new HttpParams().set('username', username).append('password', password);
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
          if (userType === 'admin') {
            this.saveToken('admin_access_token', token.access_token);
            this.saveToken('admin_refresh_token', token.refresh_token);
            this.setAuthHeaders('admin');
            this.adminMode = true;
            this.router.navigate(['admin/home']);
          } else {
            this.saveToken('dino_access_token', token.access_token);
            this.cookieService.set('user_id', token.userId.toString());
            this.setAuthHeaders('user');
          }
        }
      },
      (error) => {
        console.log('Login Error: ', error);
      }
    );

  }

  facebookLogin() {
    const request = new HttpRequest('GET',
      this.path + 'login/facebook-user',
      null,
      {responseType: 'text'});
    this.http.request(request).pipe(map(
      (response: HttpResponse<any>) => {
        const body = response['body'];
        const token: Token = JSON.parse(body || '{}');
        return token;
      }
    )).subscribe(
      (token) => {
        if (token.access_token !== undefined) {
          console.log('Dino Access Token: ', token.access_token);
          this.saveToken('dino_access_token', token.access_token);
          this.setAuthHeaders('user');
        }
      },
      (error) => {
        console.log('Login Error: ', error);
      }
    );
  }

  saveToken(token: string, tokenName: string) {
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

}
