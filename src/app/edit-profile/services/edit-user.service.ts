import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {SessionService} from "../../core/session.service";

@Injectable()
export class EditUserService {
  url = 'http://fe-kurs.light-it.loc:38000';


  constructor (private http: Http, private sessionService: SessionService) {}

  public updatePhoto (photo: any) {
    const formData = new FormData();
    formData.append('photo', photo);
    // let data = { photo: photo };
    return this.http.post(this.url + '/api/photo/',  formData)
      .map((resp) => {
        resp = resp.json();
        console.log(resp);
        return resp;
      })
      .catch(this.handleError);
  }

  public updateUserPhoto (photoId: number) {
    // debugger;
    let data = {user: this.sessionService.currentUser.id, photo: photoId};
    return this.http.post(this.url + '/api/profile_photo/', data)
      .map(resp => {
        return resp.json();
      })
      .catch(this.handleError);
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
