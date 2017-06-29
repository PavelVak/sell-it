import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, URLSearchParams } from '@angular/http';
import { Item, ItemDetails } from './Items';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpConfigService } from './http-config.service';


@Injectable()
export class HttpService {

  private limit: string = '16';
  private offset: number|string = 0;
  private search: string = '';
  private id: number|string;

  constructor(
    private http: Http,
    private httpConfigService: HttpConfigService){ }

  getItems(offset: number|string = 0, title: string = null): Observable<Item[]> {
    this.offset = offset;
    let params: URLSearchParams = new URLSearchParams();
    params.set('limit', this.limit);
    params.set('offset', <string>this.offset);

    if(title) {
      params.set('search', <string>title);
    }

    return this.http.get(this.httpConfigService.API_POSTER, {search: params})
      .map((resp: Response) => {

        let itemsList = resp.json().results;
        let items: Item[] = [];
        for (let index in itemsList) {
          console.log(itemsList[index]);
          let item = itemsList[index];
          if(item.photo_details[0])
            items.push({id: item.id, title: item.title, imageSrc: item.photo_details[0]['photo']});
        }
        return items;
      });
  }

  getItem(id: number|string) {
      this.id = id;
      return this.http.get(this.httpConfigService.API_POSTER + this.id)
          .map((resp: Response) => {

              let itemFromResp = resp.json();
              let item: ItemDetails = new ItemDetails(
                  itemFromResp.id,
                  itemFromResp.title,
                  itemFromResp.description,
                  itemFromResp.author_details,
                  itemFromResp.price,
                  itemFromResp.photo_details
              );
              console.log('at getting');
              return item;
          });
  }

  loadProductPhoto(photos): Observable<any> {
    const formData = new FormData();
    for (let photo of photos) {
      formData.append('photo', photo);
    }
    return this.http.post(this.httpConfigService.API_PHOTO, formData)
      .map((resp) => {
        resp = resp.json();
        return resp;
      })
  }

  CreateProduct(productData) {
    return this.http.post(this.httpConfigService.API_POSTER, productData)
      .map((resp) => {
        resp = resp.json();
        return resp;
      })
  }

  updateProduct(productData, productId) {
    return this.http.put(`${this.httpConfigService.API_POSTER}${productId}/`, productData)
      .map((resp) => {
        resp = resp.json();
        console.log('test resp',resp);
        return new ItemDetails(resp['id'], resp['title'], resp['description'], resp['author'],
          resp['price'], resp['photo_details'])
      })
  }
}
