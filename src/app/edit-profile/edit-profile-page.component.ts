import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { validationMessages } from '../shared/components/validationMessages';
import { EditUserService } from './services/edit-user.service';
import { ProfileService } from '../core/profile.service';

function PasswordValidator(param: any): ValidatorFn {
  return (c: AbstractControl) : {[key: string]: boolean} | null => {
    let parent = c.parent;
    if (!parent) { return null; }
    let passwordControl = parent.get(param);
    let confirmPassword = c;
    if (confirmPassword.value !== passwordControl.value) { return {noMatch: true}; }
    return null;
  };
}
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
  public currentUser;
  public changePhoto: boolean = true;
  public changePhotoForm: FormGroup;
  public changePasswordForm: FormGroup;
  public validationMessages = validationMessages;
  public submittedChangePhoto: boolean = false;
  public submittedChangePassword: boolean = false;
  public serverErrors: any[];
  public file: any;

  private labelsError = {
    new_password1: 'New Password',
    new_password2: 'Confirm New Password',
    old_password: 'Old Password'
  };

  constructor (private fb: FormBuilder,
               private profileService: ProfileService) {}

  public ngOnInit() {
    this.profileService.myLoadUser().then((data) => {
      console.log(data);
      return this.currentUser = data;
    });

    this.changePhotoForm = this.fb.group({
      photo: ['']
    });

    this.changePasswordForm = this.fb.group({
      passwordGroup: this.fb.group({
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required, PasswordValidator('password')]]
      })
    });
  }

  public addPhoto(event) {
    let target = event.target || event.srcElement;
    this.file = target.files;
  }

  public formPhotoSubmit() {
    this.submittedChangePhoto = true;
    this.profileService.myUpdatePhoto(this.currentUser.id, this.file[0])
      .then((data) => console.log('data from component: ', data));

    // this.editUserService.updatePhoto(this.file[0]).subscribe((data) => {
    //   let photoId = data[0]['id'];
    //   this.editUserService.updateUserPhoto(photoId).subscribe((data) => data);
    //   return data;
    // });
  }

  public formPasswordSubmit() {
    let data = {
      new_password1: this.changePasswordForm.get('passwordGroup.password').value,
      new_password2: this.changePasswordForm.get('passwordGroup.confirmPassword').value,
      old_password: this.changePasswordForm.get('passwordGroup.oldPassword').value
    };
    this.profileService.myChangePassword(data).subscribe(
      (data) => { this.submittedChangePassword = true; },
      (error) => {
        this.serverErrors = [];
        Object.keys(error).map((item) => {
          return this.serverErrors.push({key: this.labelsError[item], value: error[item].join(' ')});
        });
        console.log(this.serverErrors);
      });
  }

  public toggleState(value) {
    this.changePhoto = value === 'photo';
  }
}
