import { Component, OnInit } from '@angular/core';
import { MyAuthService } from '../../../../core/myAuth.service';
import { Router } from '@angular/router';
import { SessionService}  from '../../../../core/session.service';
import { UserModel } from '../../../../core/auth.model';

@Component({
  selector: 'sellit-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: [ './user-panel.component.scss' ]
})

export class UserPanelComponent implements OnInit{

  public toggleMenu = false;

  public isLogin: boolean = false;

  private user: UserModel;

  constructor(private myAuth: MyAuthService, private sessionService: SessionService, private router: Router) {}

  ngOnInit() {
    if (this.sessionService.token && localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.user = new UserModel(user['id'], user['firstName'], user['lastName'], user['email'], user['username'], user['photo']);
      this.sessionService.currentUser = this.user;
      this.isLogin = this.myAuth.isLogin();
    }
  }

  public logOut() {
    this.myAuth.logout();
    this.user = this.sessionService.currentUser;
    this.router.navigate(['/']);
  }

  public toggleUserMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

}
