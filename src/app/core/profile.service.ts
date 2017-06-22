import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './auth.model';

@Injectable()
export class ProfileService {

  public url = 'http://fe-kurs.light-it.loc:38000';

  constructor(private http: Http, private sessionService: SessionService){}


  myLoadUser():Promise<UserModel>{
    return this.http.get(this.url + '/api/profile/me/').map((resp: Response) =>{
      let data = resp.json();
      return new UserModel(data.id, data.first_name, data.last_name, data.email, data.username, data.photo);
    }).toPromise();
  }

  myUpdatePhoto(id, photo){
    const formData = new FormData();
    formData.append('photo', photo);
    return this.http.post(this.url + '/api/photo/',  formData)
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
    return this.http.post(this.url + '/api/profile_photo/', data)
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
}
