import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyAuthService } from '../core/myAuth.service';
import { RegistrationModel } from '../core/auth.model';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit{
  public loginForm: FormGroup;

  constructor (private fb: FormBuilder, private myAuth: MyAuthService) {}

  public ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      username: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  public submitLoginForm($event) {
    $event.preventDefault();
    console.log(new RegistrationModel(this.loginForm.value));
    let data = this.loginForm.value;
    this.myAuth.signUp(new RegistrationModel(data)).subscribe((data) => {console.log(data)});
  }
}
