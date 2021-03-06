import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validationMessages } from '../shared/components/validationMessages';
import { customLengthValidator } from '../shared/directives/customLengthValidator';
import { customFloatValidator } from '../shared/directives/customFloatValidator';
import { AddProduct } from '../shared/models/add-product.model';
import { SessionService } from '../core/session.service';
import { HttpService } from '../products/services/http.service';
import { fileValidator } from './input-file-validator';

@Component({
  selector: 'sellit-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss']
})
export class AddProductPageComponent implements OnInit {

  public descriptionLength: number = 20;
  public restOfLength: number = this.descriptionLength;
  public reachLimit: boolean = false;
  public addProductForm: FormGroup;
  public validationMessages = validationMessages;
  public submitted: boolean = false;
  public addProduct: AddProduct;
  public files: any[] = [];
  public fileNames: string;

  constructor (private fb: FormBuilder,
               private sessionService: SessionService,
               private httpService: HttpService) {}

  public ngOnInit() {
    this.addProductForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [customLengthValidator(this.descriptionLength)]],
      price: ['', [Validators.required, customFloatValidator]],
      photo: ['']
    });

    this.addProductForm.get('description').valueChanges.subscribe((value) => {
      this.reachLimit = false;
      // tslint:disable
      value = value.replace(/<{1}[^<>]{1,}>{1}/g,'').replace(/&nbsp;/g, '').replace(/&amp;/g, ' ');
      if (value) {
        this.restOfLength = this.descriptionLength - value.length;
      } else {
        this.restOfLength = this.descriptionLength;
      }
      if (this.restOfLength <= 0) {
        this.reachLimit = true;
      }
    });
  }

  public setValueForm() {
    this.addProductForm.setValue({
      title: 'My title',
      description: 'My description',
      price: '100',
      photo: ''
    });
  }

  public patchValueForm() {
    this.addProductForm.patchValue({
      title: 'My title',
      author: 'My author',
    });
  }

  public addPhoto(event) {
    let target = event.target || event.srcElement;
    this.files = target.files;
    let filenamesArray: string[] = [];
    for (let file of this.files){
      filenamesArray.push(file.name);
    }
    this.fileNames = filenamesArray.join(', ');
  }

  public formSubmit() {
    let productData = {
      title: this.addProductForm.get('title').value,
      description: this.addProductForm.get('description').value,
      author: this.sessionService.currentUser.id,
      price: this.addProductForm.get('price').value,
    };

    this.httpService.loadProductPhoto(this.files).subscribe((data) => {
      let photos = data.map((item) => {
        return item.id;
      });

      productData['photos'] = photos;

      this.addProduct = new AddProduct(productData);
      this.httpService.CreateProduct(this.addProduct);

      this.submitted = true;
    });

  }

  public resetStateForm() {
    this.addProductForm.markAsPristine();
    this.addProductForm.markAsUntouched();
    this.addProductForm.setValue({
      title: '',
      description: '',
      author: '',
      price: '',
      photo: ''
    });
    this.addProductForm.updateValueAndValidity();
  }

}
