import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MyAuthService {

  public API_URL: string = 'http://fe-kurs.light-it.loc:38000';


  constructor(private http: Http){}

  public signUp(data: any){
    let headers = new Headers();
    headers.append('Authorization', '123479');

    console.log('qdeasd', headers);
    return this.http.post(this.API_URL + '/api/signup/', data, {headers: headers}).map(resp =>{
      return resp.json()})
  }

}
