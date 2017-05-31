import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  public POSTERS_URL: string = 'http://fe-kurs.light-it.net:38000/api/poster/';
  public POSTERS_URL_LOCAL: string = 'http://fe-kurs.light-it.loc:38000/api';
}
