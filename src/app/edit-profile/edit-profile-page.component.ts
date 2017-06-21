import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { validationMessages } from '../shared/components/validationMessages';
import { EditUserService } from "./services/edit-user.service";

// function testValidator(param: any): ValidatorFn {
//   return (c: AbstractControl) : {[key: string]: boolean} | null => {
//     let parent = c.parent;
//     if (!parent) { return null; }
//     let passwordControl = parent.get(param);
//     let confirmPassword = c;
//     if (confirmPassword.value !== passwordControl.value) return {noMatch: true};
//     return null;
//   };
// }
// function passwordMatcher(c: AbstractControl){
//   let passwordControl = c.get('password');
//   let confirmControl = c.get('confirmPassword');
//   if(passwordControl.value === confirmControl.value) {
//     return null;
//   }
//   return { 'match': true};
// }

@Component({
  selector: 'sellit-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {
  public editForm: FormGroup;
  public validationMessages = validationMessages;
  public submitted: boolean = false;
  file: any;
  constructor (private fb: FormBuilder, private editUserService: EditUserService) {}

  public ngOnInit() {
    this.editForm = this.fb.group({
      photo: [''],
      // passwordGroup: this.fb.group({
      //   password: ['', [Validators.required]],
      //   confirmPassword: ['',[Validators.required, testValidator('password')]]
      // })
    });
  }

  addPhoto(event) {
    let target = event.target || event.srcElement;
    this.file = target.files;
  }

  public formSubmit() {
    this.submitted = true;
    this.editUserService.updatePhoto(this.file[0]).subscribe((data) => {
      let photoId = data[0]['id'];
      this.editUserService.updateUserPhoto(photoId).subscribe((data) => data);
      return data;
    });


  }
}
