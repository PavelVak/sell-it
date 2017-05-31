import { Component, OnInit } from '@angular/core';
import { Item } from '../services/Items';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'sellit-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  constructor(private httpServ: HttpService){}

  public ngOnInit() {
    this.httpServ.getItems().subscribe((items) => {this.items = items; console.log(this.items);});
  }

  offsetStep: number = 0;
  respFlag: boolean = true;
  items: Item[] = [];

  addItems() {
    if (this.respFlag) {
      let lengthItems: number = this.items.length;
      this.offsetStep += 16;
      this.httpServ.getItems(this.offsetStep).subscribe((items) => {
        this.items = this.items.concat(items);
        if (this.items.length === lengthItems) {
          this.respFlag = false;
        };
      });
    }
  }
}
