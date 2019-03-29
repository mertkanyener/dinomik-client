import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Data, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

export interface Token {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

@Injectable()
export class AuthService{

  private path = 'http://localhost:8080/';

  status = new Subject<number>();
  clientId = '647358105696445';
  redirectUri = 'http://localhost:4200/';
  state = 'yr6VZn';

  adminMode = false;
  httpOptions: any;



  constructor(private http: HttpClient,
              private router: Router){}

  getToken(code: string, state: string) {

    const url = this.path + 'login?code=' + code + "&state=" + state;

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

  adminLogin(username: string, password: string) {

    const clientId = 'admin-client';
    const clientSecret = 'mert-secret';
    const headers = new HttpHeaders().set("Content-type", "application/x-www-form-urlencoded").append("Accept","application/json");
    const params = new HttpParams().set("client_id", clientId).append("client_secret", clientSecret)
      .append("username", username).append("password", password).append("grant_type", "password");
    //const data: Data = { username: username, password: password, grant_type: "password", client_id: clientId, client_secret: clientSecret};
    const request = new HttpRequest("POST",
      this.path + "oauth/token",
      null,
      {headers: headers, params: params , responseType: 'text'});
    this.http.request(request).pipe(map(
      (response: HttpResponse<any>) => {
        let body = response['body'];
        let token: Token = JSON.parse(body || '{}');
        return token;
      }
    )).subscribe(
      (token) => {
        console.log("Token: ", token);
        if (token.access_token != undefined){
          this.saveAdminToken(token);
          this.adminMode = true;
          this.setAuthHeaders();
          this.router.navigate(['admin/home']);
        }
      },
      (error) => {
        console.log("ERROR: ", error);
        this.status.next(error.status);
        console.log("Error status: ", error.status);
      }
    );
  }


  saveToken(token) {
    let expiration = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);
  }

  saveAdminToken(token: Token) {
    localStorage.setItem('admin_access_token', token.access_token);
    localStorage.setItem('admin_refresh_token', token.refresh_token);
  }

  isAuthenticated(): boolean{
    return localStorage.getItem('access_token') != null && localStorage.getItem('access_token') != 'undefined';
  }

  isAdmin(): boolean {
    return localStorage.getItem('admin_access_token') != null && localStorage.getItem('admin_access_token') != 'undefined';
  }

  logout(){
    localStorage.removeItem('access_token');
    window.location.reload();
  }

  adminLogout(){
    this.adminMode = false;
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    this.router.navigate(['admin']);
  }

  setAuthHeaders(){

    this.httpOptions = {
      headers: new HttpHeaders(
        {'Authorization': 'Bearer ' + localStorage.getItem('admin_access_token')
        }
      )
    };
  }



}
