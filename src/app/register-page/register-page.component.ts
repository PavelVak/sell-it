import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MyAuthService } from '../core/myAuth.service';
import { RegistrationModel } from '../core/auth.model';
import { validationMessages } from '../shared/components/validationMessages';
import { Router } from '@angular/router';

function testValidator(param: any): ValidatorFn {
  return (c: AbstractControl) : {[key: string]: boolean} | null => {
    let parent = c.parent;
    if (!parent) {
      return null;
    }
    let passwordControl = parent.get(param);
    let confirmPassword = c;
    if (confirmPassword.value !== passwordControl.value) {
      return {noMatch: true};
    }
    return null;
  };
}

const labelsError = {
  email: 'Email',
  password: 'Password',
  password_confirm: 'Confirm Password',
  username: 'Username',
  non_field_errors: 'Some unpredictable error'
};

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  public validationMessages = validationMessages;
  public registerForm: FormGroup;
  public serverErrors: any[];

  constructor (private fb: FormBuilder,
               private myAuth: MyAuthService,
               private router: Router) {}

  public ngOnInit() {
    this.registerForm = this.fb.group({
                email: ['', [Validators.required]], // [Validators.required]],
             username: ['', [Validators.required]], // [Validators.required]],
             password: ['', [Validators.required]], // [Validators.required]],
      confirmPassword: ['', [Validators.required, testValidator('password')]] // [Validators.required, testValidator('password')]]
    });
  }

  public submitRegisterForm($event) {
    $event.preventDefault();
    console.log(new RegistrationModel(this.registerForm.value));
    let data = this.registerForm.value;
    this.myAuth.signUp(new RegistrationModel(data)).subscribe((data) => {
      if (Object.keys(data).indexOf('success') > -1) {
        console.log(`success: ${data}`);
        this.router.navigate(['/login']);
      }
      this.serverErrors = [];
      Object.keys(data).map((item, index) => {
        return this.serverErrors.push({key: labelsError[item], value: data[item]});
      });
      console.log(this.serverErrors);
      return false;
    });
  }
}
