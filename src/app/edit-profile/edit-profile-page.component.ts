import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { validationMessages } from '../shared/components/validationMessages';

function testValidator(param: any): ValidatorFn {
  return (c: AbstractControl) : {[key: string]: boolean} | null => {
    let parent = c.parent;
    if(!parent) return null;
    let password = parent.get('password');
    //let group = parent.get('passwordGroup');
    console.log(c, password);
    if(c.value != password.value) return {noMatch: true};
    return null;
  };
}
function passwordMatcher(c: AbstractControl){
  let passwordControl = c.get('password');
  let confirmControl = c.get('confirmPassword');
  if(passwordControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true};
}

@Component({
  selector: 'sellit-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {
  public editForm: FormGroup;
  public validationMessages = validationMessages;
  public submitted: boolean = false;

  constructor (private fb: FormBuilder) {}

  public ngOnInit() {
    this.editForm = this.fb.group({
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['',[testValidator('password')]]
      }, {validator: passwordMatcher})
    });
  }

  public formSubmit() {
    this.submitted = true;
  }
}
