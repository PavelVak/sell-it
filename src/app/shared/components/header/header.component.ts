import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../home-page/user.service';

@Component({
  selector: 'sellit-header-of-page',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input()
  public titleHead;
  @Output()
  public clickHead: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: UserService) {}

  public clickBtn() {
    this.clickHead.emit({test: 'clickHead'});
  }

  public search() {
    this.userService.startSearch('testing string for startSearch');
  }
}
