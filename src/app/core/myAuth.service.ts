import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './auth.model';
import { CookieService } from 'ngx-cookie';
import { SessionService } from './session.service';


@Injectable()
export class MyAuthService {
  public user: UserModel = new UserModel(null, '', '', '', '', null);

  public API_URL: string = 'http://fe-kurs.light-it.net:38000';
  public API_URL_LOCAL: string = 'http://fe-kurs.light-it.loc:38000';

  constructor(private http: Http, private cookieService: CookieService, private sessionService: SessionService) {}

  public setCookie(key: string, value: string) {
    this.cookieService.put(key, value);
  }

  public removeCookie(key: string) {
    this.cookieService.remove(key);
  }

  public signUp(data: any) {

    let headers = new Headers();
    headers.append('Authorization', '123479');
    return this.http.post(this.API_URL + '/api/signup/', data, {headers: headers})
      .map((resp) => resp.json())
      .catch(this.handleError);
  }

  public login(data: any) {
    return this.http.post(this.API_URL + '/api/login/', data)
      .map((resp) => {
        resp = resp.json();
        this.sessionService.token = resp['token'];
        let user = new UserModel(resp['id'], resp['first_name'], resp['last_name'], resp['email'], resp['username'], resp['photo']);
        this.sessionService.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Current User: ', this.sessionService.currentUser);
        return resp;
      })
      .catch(this.handleError);
  }

  public logout() {
    this.sessionService.currentUser = new UserModel(null, '', '', '', '', null);
    localStorage.removeItem('user');
    console.log('Current User logout: ', this.sessionService.currentUser);
    this.sessionService.token = '';
    return this.http.post(this.API_URL + '/api/logout/', {})
      .map((resp) => resp.json())
      .catch(this.handleError);

  }

  public isLogin(){
    return !!this.sessionService.token;
  }

  public currentUser(data: any){
    this.user.id = data.id;
    this.user.firstName = data.firstName || '';
    this.user.lastName = data.lastName || '';
    this.user.email = data.email;
    this.user.username = data.username;
   // this.isLogin = true;
  }


  /*handle any errors from the APi*/
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body = err.json() || '';
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }
    return Observable.throw(errMessage);
    // return Observable.throw(err.json().data || 'Server error');
  }

}
