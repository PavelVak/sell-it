import { Component, OnInit } from '@angular/core';

export class Product{
  public title: string;
  public description: string;
  public author: string;
  public price: string;
  public photo: any;
}

@Component({
  selector: 'detail-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss']
})

export class AddProductPageComponent implements OnInit {
  public product: Product;
  public submitted: boolean = false;
  public descriptionLength: number = 300;
  public restOfLength: number = this.descriptionLength;
  public reachLimit: boolean = false;

  ngOnInit () {
    this.product = {
      title: '',
      description: '',
      author: '',
      price: '',
      photo: ''
    };
  }

  public countRest() {
    this.reachLimit = false;
    if (this.product.description) {
      this.restOfLength = this.descriptionLength - this.product.description.length;
    } else {
      this.restOfLength = this.descriptionLength;
    }
    if (this.restOfLength <= 0) {
      this.reachLimit = true;
    }
  }

  processForm() {
    console.log(this.product);
    this.submitted = true;
  }
}
