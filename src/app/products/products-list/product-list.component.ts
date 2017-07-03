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
  public queryString: any = null;
  public subscription: Subscription;

  public offsetStep: number = 0;
  public respFlag: boolean = true;
  public items: Item[] = [];
  public loading: boolean = false;

  constructor(private httpServ: HttpService,
              private searchservice: SearchService) {
    this.subscription = this.searchservice.subscribeToQuery()
      .subscribe((queryString) => {
        this.queryString = queryString.text;
        this.httpServ.getItems(0, this.queryString).subscribe((items) => {
          this.items = items;
          this.offsetStep = 0;
          this.respFlag = true;
        });
      });
  }

  public ngOnInit() {
    this.httpServ.getItems().subscribe((items) => { this.items = items; console.log(this.items); });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public addItems() {
    if (this.respFlag && !this.loading) {
      let lengthItems: number = this.items.length;
      this.offsetStep += 16;
      this.loading = true;
      this.httpServ.getItems(this.offsetStep, this.queryString).subscribe((items) => {
        this.loading = false;
        this.items = this.items.concat(items);
        if (this.items.length === lengthItems) {
          this.respFlag = false;
        }
      });
    }
  }
}
