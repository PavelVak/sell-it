import { Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { SessionService } from './session.service';

@Injectable()
export class ApiHttp extends Http {

  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, private sessionService: SessionService) {
    super(_backend, _defaultOptions);
  }

  public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if(this.sessionService.token){
      if (options) {
        options.headers.set('Authorization', 'Token ' + this.sessionService.token);
      } else {
        (<Request> url).headers.set('Authorization', 'Token ' + this.sessionService.token);
      }
    }
    return super.request(url, options);
  }
}
