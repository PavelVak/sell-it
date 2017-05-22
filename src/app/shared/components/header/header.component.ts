import {Component, Input, Output, EventEmitter} from "@angular/core";



@Component({
  selector: 'header-of-page',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent{
  @Input()
  public titleHead;
  @Output()
  public clickHead: EventEmitter<any> = new EventEmitter<any>();


  clickBtn(){
    this.clickHead.emit({"test":"clickHead"});
    console.log("Click BTN");
  }
}
