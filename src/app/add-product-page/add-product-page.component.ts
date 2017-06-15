import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { validationMessages } from '../shared/components/validationMessages';
import { customLengthValidator } from '../shared/directives/customLengthValidator';
import { customFloatValidator } from '../shared/directives/customFloatValidator';

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

  constructor (private fb: FormBuilder) {}

  public ngOnInit() {
    this.addProductForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [customLengthValidator(this.descriptionLength)]],
      author: ['', [Validators.required]],
      price: ['', [Validators.required, customFloatValidator]],
      photo: ['']
    });

    this.addProductForm.get('description').valueChanges.subscribe(value => {
      this.reachLimit = false;
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
      author: 'My author',
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
  public formSubmit() {
    this.submitted = true;
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

 /* public product: Product;

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

  }*/

