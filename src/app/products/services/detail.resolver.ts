import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './product.model';
import { Observable } from 'rxjs/Observable';
import { ProductService } from './product.service';
import { HttpService } from "./http.service";
import { ItemDetails } from "./Items";

@Injectable()
export class ItemDetailResolver implements Resolve<ItemDetails> {

    constructor(private httpServ: HttpService) {
      console.log('init resolver');
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
        console.log('before get item');
        return this.httpServ.getItem(route.params.id);
    }
}
