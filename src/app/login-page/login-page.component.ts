import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../shared/components/validationMessages';
import { loginModel } from '../core/auth.model';
import { MyAuthService } from '../core/myAuth.service';
import { Router } from '@angular/router';
import { SessionService } from '../core/session.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  public validationMessages = validationMessages;
  public loginForm: FormGroup;
  public serverErrors: any[];

  constructor (
    private router: Router,
    private fb: FormBuilder,
    private myAuth: MyAuthService){}

  public ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public submitLoginForm() {
    let data = this.loginForm.value;
    this.myAuth.login(new loginModel(data.email, data.password)).subscribe(
      (data) => {
        console.log(`success: ${JSON.stringify(data)}`);
        // this.myAuth.currentUser(data);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.serverErrors = [];
        this.serverErrors.push({key: 'Error from server', value: error});
        console.log(error);
      });
  }
}
