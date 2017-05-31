import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, URLSearchParams} from '@angular/http';
import {Item} from './Items';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ConstantsService} from './http-config.service';


@Injectable()
export class HttpService {

  private limit: string = '16';
  private offset: number|string = 0;
  private search: string = '';

  constructor(private http: Http, private consts: ConstantsService){ }

  getItems(offset: number|string = 0): Observable<Item[]> {
    this.offset = offset;

    let params: URLSearchParams = new URLSearchParams();
    params.set('limit', this.limit);
    params.set('offset', <string>this.offset);

    return this.http.get(this.consts.POSTERS_URL, {search: params})
      .map((resp: Response) => {

        let itemsList = resp.json().results;

        let items: Item[] = [];
        for (let index in itemsList) {
          console.log(itemsList[index]);
          let item = itemsList[index];
          items.push({id: item.id, title: item.title, imageSrc: item.photo_details[0]['photo']});
        }
        return items;
      });
  }
}
