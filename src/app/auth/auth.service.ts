import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class AuthService{

  clientId = '647358105696445';
  redirectUri = 'http://localhost:4200/';
  state = 'yr6VZn';

  adminMode = false;


  constructor(private http: HttpClient){}

  getToken(code: string, state: string) {

    const url = 'http://localhost:8080/login?code=' + code + "&state=" + state;

    this.http.get(url).subscribe(
      (res) => {
        console.log("Token: ", res);
        this.saveToken(res);
      },
      (err) => {
        console.log("ERROR: ", err);
      }
    );
  }

  adminLogin() {

  }


  saveToken(token) {
    let expiration = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);
  }

  isAuthenticated(): boolean{
    return localStorage.getItem('access_token') !== null;
  }

  logout(){
    localStorage.removeItem('access_token');
    window.location.reload();
  }







}
