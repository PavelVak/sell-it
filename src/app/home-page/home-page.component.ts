import {Component} from "@angular/core";
import {Item} from "../shared/Items";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent{

  items: Item[] = [
      { id : 1, title: 'Product title ', imageSrc: 'assets/img/product-1.png'},
      { id : 2, title: 'Product title ', imageSrc: 'assets/img/product-2.png'},
      { id : 3, title: 'Product title ', imageSrc: 'assets/img/product-3.png'},
      { id : 4, title: 'Product title ', imageSrc: 'assets/img/product-4.png'},
      { id : 5, title: 'Product title ', imageSrc: 'assets/img/product-1.png'},
      { id : 6, title: 'Product title ', imageSrc: 'assets/img/product-2.png'},
      { id : 7, title: 'Product title ', imageSrc: 'assets/img/product-3.png'},
      { id : 8, title: 'Product title ', imageSrc: 'assets/img/product-4.png'},
      { id : 9, title: 'Product title ', imageSrc: 'assets/img/product-1.png'},
      { id : 10, title: 'Product title ', imageSrc: 'assets/img/product-2.png'},
      { id : 11, title: 'Product title ', imageSrc: 'assets/img/product-3.png'},
      { id : 12, title: 'Product title ', imageSrc: 'assets/img/product-4.png'},
      { id : 13, title: 'Product title ', imageSrc: 'assets/img/product-1.png'},
      { id : 14, title: 'Product title ', imageSrc: 'assets/img/product-2.png'},
      { id : 15, title: 'Product title ', imageSrc: 'assets/img/product-3.png'},
      { id : 16, title: 'Product title ', imageSrc: 'assets/img/product-4.png'}
    ];

  addItems() {
    for(var i = 0; i < 16; i++) {
      this.items.push(this.items[i]);
    }
  }
}
