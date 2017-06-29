import { Injectable } from '@angular/core';

@Injectable()
export class HttpConfigService {
  public API_URL: string;
  public API_URL_HOME: string = 'http://fe-kurs.light-it.net:38000';
  public API_URL_OFFICE: string = 'http://fe-kurs.light-it.loc:38000';

  public API_POSTER: string;
  public API_SIGNUP: string;
  public API_LOGIN: string;
  public API_LOGOUT: string;
  public API_PROFILE_ME: string;
  public API_PHOTO: string;
  public API_PROFILE_PHOTO: string;
  public API_CHANGE_PASSWORD: string;

  constructor(){
    this.API_URL = this.API_URL_OFFICE;

    this.API_POSTER = this.API_URL + '/api/poster/';
    this.API_SIGNUP = this.API_URL + '/api/signup/';
    this.API_LOGIN = this.API_URL + '/api/login/';
    this.API_LOGOUT = this.API_URL + '/api/logout/';
    this.API_PROFILE_ME = this.API_URL + '/api/profile/me/';
    this.API_PHOTO = this.API_URL + '/api/photo/';
    this.API_PROFILE_PHOTO = this.API_URL + '/api/profile_photo/';
    this.API_CHANGE_PASSWORD = this.API_URL + '/api/change_password/';
  }
}
