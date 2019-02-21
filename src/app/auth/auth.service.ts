import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class AuthService{

  public clientId = '647358105696445';
  public clientSecret = '7c2cfc030acf8551641f65c2531ab0c3';
  public redirectUri = 'http://localhost:4200/';
  public state = 'yr6VZn';

  constructor(private http: HttpClient){}

  getToken2(code: string, state: string){
    const params = new URLSearchParams();
      params.append('client_id', this.clientId)
      params.append('grant_type', 'authorization_code')
      params.append('redirect_uri', this.redirectUri)
      params.append('code', code)
      params.append('state', state);

    const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
      .append('Authorization', 'Basic '+btoa(this.clientSecret));
    this.http.post('https://graph.facebook.com/oauth/access_token', params.toString(),  {headers:headers}).subscribe(
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

  getToken(code: string, state: string) {
    // const url = 'https://graph.facebook.com/v3.2/oauth/access_token?client_id=' + this.clientId
    //     //   + "&redirect_uri=" + this.redirectUri + "&client_secret=" + this.clientSecret + "&code=" + code
    //     //   + "&state=" + state;

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
