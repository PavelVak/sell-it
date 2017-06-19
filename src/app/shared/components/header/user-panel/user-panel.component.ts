import { Component, OnInit } from '@angular/core';
import { MyAuthService } from '../../../../core/myAuth.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../../core/session.service';

@Component({
  selector: 'sellit-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: [ './user-panel.component.scss' ]
})

export class UserPanelComponent implements OnInit{

  public toggleMenu = false;

  public isLogin: boolean;

  constructor(private myAuth: MyAuthService, private router: Router) {}

  ngOnInit(){
    this.isLogin = this.myAuth.isLogin();
    console.log('test : ', this.myAuth.isLogin() )
  }

  public logOut() {
    this.myAuth.logout();
    this.router.navigate(['/']);
  }

  public toggleUserMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

}
