import {Component, Input, Output, EventEmitter} from "@angular/core";
import {UserService} from "../../../home-page/user.service";



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

  constructor(private userService: UserService){}


  clickBtn(){
    this.clickHead.emit({"test":"clickHead"});
    console.log("Click BTN");
  }

  public search(){
    console.log("Search Working!");
    this.userService.startSearch("testing string for startSearch")
  }
}
