import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../services/Items';
import { HttpService } from '../services/http.service';
import { Subscription } from 'rxjs/Subscription';
import { SearchService } from '../../shared/components/header/search/search.service';

@Component({
  selector: 'sellit-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit, OnDestroy {
  queryString: any = null;
  subscription: Subscription;

  constructor(private httpServ: HttpService,
              private searchservice: SearchService){
    this.subscription = this.searchservice.subscribeToQuery()
      .subscribe(queryString => {
        this.queryString = queryString.text;
        this.httpServ.getItems(0, this.queryString).subscribe((items) => {this.items = items;});
      });
  }

  public ngOnInit() {
    this.httpServ.getItems().subscribe((items) => {this.items = items; console.log(this.items);});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  offsetStep: number = 0;
  respFlag: boolean = true;
  items: Item[] = [];

  addItems() {
    if (this.respFlag) {
      let lengthItems: number = this.items.length;
      this.offsetStep += 16;
      this.httpServ.getItems(this.offsetStep, this.queryString).subscribe((items) => {
        this.items = this.items.concat(items);
        if (this.items.length === lengthItems) {
          this.respFlag = false;
        };
      });
    }
  }
}
