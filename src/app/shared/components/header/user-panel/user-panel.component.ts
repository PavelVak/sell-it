import { Component } from '@angular/core';
import { MyAuthService } from '../../../../core/myAuth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sellit-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: [ './user-panel.component.scss' ]
})

export class UserPanelComponent {

  public toggleMenu = false;

  constructor(private myAuth: MyAuthService, private router: Router) {}

  public logOut() {
    this.myAuth.logout();
    this.myAuth.removeCookie('Token');
    this.router.navigate(['/']);
  }

  public toggleUserMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

}
