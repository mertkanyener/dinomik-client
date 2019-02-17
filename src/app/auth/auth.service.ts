import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class AuthService{

  public clientId = '647358105696445';
  public clientSecret = '7c2cfc030acf8551641f65c2531ab0c3';
  public redirectUri = 'http://localhost:4200';

  constructor(private http: HttpClient){}

  getToken(code: string){
    const params = new HttpParams().set('client_id', this.clientId)
      .append('grant_type', 'authorization_code')
      .append('redirect_uri', this.redirectUri)
      .append('code', code);

    const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
      .append('Authorization', 'Basic '+btoa(this.clientId+ ":" + this.clientSecret));
    this.http.post('https://graph.facebook.com/oauth/access_token', null,  {params: params, headers:headers}).subscribe(
      (res) => {
        console.log("Token: ", res);
        this.saveToken(res);
      },
      (err) => {
        console.log("Code: ", code);
        console.log("ERROR: ", err);
      }
    );
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
