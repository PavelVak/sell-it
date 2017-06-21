import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { UserModel } from './auth.model';

@Injectable()
export class SessionService {
  private key = 'Token';
  private user: UserModel = new UserModel(null, '', '', '', '', null);

  constructor(private cookieService: CookieService){

  }

  get token(){
    return this.cookieService.get(this.key);
  }

  set token(value: string){
    this.cookieService.put(this.key, value)
  }

  get currentUser(){
    return this.user;
  }

  set currentUser(value){
    this.user = value;
  }

}
