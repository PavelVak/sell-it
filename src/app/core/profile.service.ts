import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './auth.model';
import { HttpConfigService } from '../products/services/http-config.service';

@Injectable()
export class ProfileService {

  public url = 'http://fe-kurs.light-it.loc:38000';

  constructor(
    private http: Http,
    private sessionService: SessionService,
    private httpConfigService: HttpConfigService){}


  myLoadUser():Promise<UserModel>{
    return this.http.get(this.httpConfigService.API_PROFILE_ME).map((resp: Response) =>{
      let data = resp.json();
      return new UserModel(data.id, data.first_name, data.last_name, data.email, data.username, data.photo);
    }).toPromise();
  }

  myUpdatePhoto(id, photo){
    const formData = new FormData();
    formData.append('photo', photo);
    return this.http.post(this.httpConfigService.API_PHOTO,  formData)
      .map((resp) => {
        resp = resp.json();
        return resp;
      })
      .toPromise()
      .then(resp => {
        return this.myProfileUpdate(id, resp[0]['id'])
      })
  }

  public myProfileUpdate(userId, photoId){
    let data = {user: userId, photo: photoId};
    return this.http.post(this.httpConfigService.API_PROFILE_PHOTO, data)
      .map((resp) => {
        resp = resp.json();
        return resp;
      })
      .toPromise()
      .then(resp =>{
        console.log(resp);
        return this.myLoadUser();
      });
  }

  public myChangePassword(data){
    return this.http.post(this.httpConfigService.API_CHANGE_PASSWORD, data)
      .map((resp) => {
        resp = resp.json();
        console.log(resp);
        return resp;
      })
      .catch(this.handleError)

  }

  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body = err.json() || '';
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }
    return Observable.throw(err.json());
    // return Observable.throw(err.json().data || 'Server error');
  }

}
