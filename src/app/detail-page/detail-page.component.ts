import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetails } from '../products/services/Items';
import { SessionService } from '../core/session.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddProduct } from '../shared/models/add-product.model';
import { HttpService } from '../products/services/http.service';
import { customLengthValidator } from '../shared/directives/customLengthValidator';
import { customFloatValidator } from '../shared/directives/customFloatValidator';
import { validationMessages } from '../shared/components/validationMessages';

@Component({
  selector: 'detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})

export class DetailPageComponent implements AfterViewInit {

  public descriptionLength: number = 20;
  public restOfLength: number = this.descriptionLength;
  public reachLimit: boolean = false;
  public editProductForm: FormGroup;
  public validationMessages = validationMessages;
  public submitted: boolean = false;
  public editProduct: AddProduct;
  public files: any;
  public fileNames: string;

  public currentUserId: number;
  public checkedId: boolean;
  public item: ItemDetails;
  public toggleEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private httpService: HttpService) {
    this.route.data.subscribe((item: any) => { this.item = item.itemDetails; });
  }

  public addPhoto(event) {
    let target = event.target || event.srcElement;
    this.files = target.files;
    let filenamesArray: string[] = [];
    for (let file of this.files) {
      filenamesArray.push(file.name);
    }
    this.fileNames = filenamesArray.join(', ');
  }

  public formSubmit() {
    let productData = {
      title: this.editProductForm.get('title').value,
      description: this.editProductForm.get('description').value,
      author: this.sessionService.currentUser.id,
      price: this.editProductForm.get('price').value,
    };

    this.httpService.loadProductPhoto(this.files).subscribe((data) => {
      let photos = data.map((item) => {
        return item.id;
      });
      productData['photos'] = photos;
      this.editProduct = new AddProduct(productData);
      this.httpService.updateProduct(this.editProduct, this.item.id)
        .subscribe( (data: ItemDetails) => {
          this.item = data;
          console.log('test Item', this.item);
        });
      this.toggleEdit = false;
    });
  }

  public ngAfterViewInit() {
    this.currentUserId = this.sessionService.currentUser.id;
    this.checkedId = this.userIdChecked();
    console.log('userId: ', this.currentUserId);
    console.log('Item: ', this.item);
  }

  public toggleEditProduct() {
    this.editProductForm = this.fb.group({
      title: [this.item.title, [Validators.required, Validators.minLength(3)]],
      description: [this.item.description, [customLengthValidator(this.descriptionLength)]],
      price: [this.item.price, [Validators.required, customFloatValidator]],
      photo: ['']
    });

    this.editProductForm.get('description').valueChanges.subscribe((value) => {
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

    this.toggleEdit = !this.toggleEdit;
  }

  public userIdChecked() {
    return this.currentUserId === this.item.author['id'];
  }
}
