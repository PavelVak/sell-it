import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {HttpService} from "../products/services/http.service";
import {ItemDetails} from "../products/services/Items";

@Component({
  selector: 'detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})

export class DetailPageComponent {
  private id: number;
  private routeSubscription: Subscription;
  private item: ItemDetails;

  constructor(private route: ActivatedRoute, private httpServ: HttpService){
    console.log('constr detail component');
    //this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
    this.route.data.subscribe((item: any) => { this.item = item.itemDetails; });

  }

  // ngOnInit() {
  //   this.httpServ.getItem(this.id).subscribe((item) => {this.item = item; console.log(this.item);});
  // }

  // ngOnDestroy() {
  //
  //   this.routeSubscription.unsubscribe();
  //
  // }
}
