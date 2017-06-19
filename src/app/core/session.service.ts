import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class SessionService {
  private key = 'Token';

  constructor(private cookieService: CookieService){

  }

  get token(){
    return this.cookieService.get(this.key);
  }
  set token(value: string){
    this.cookieService.put(this.key, value)
  }
}
