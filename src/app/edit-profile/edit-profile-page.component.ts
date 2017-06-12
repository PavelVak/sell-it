import { Component, OnInit } from '@angular/core';

export class Profile{
  public userName: string;
  public password: string;
}

@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})

export class EditProfilePageComponent implements OnInit {
  public profile: Profile;
  public submitted: boolean = false;
  public confirmPassword: string = '';

  ngOnInit () {
    this.profile = {
      userName: 'username',
      password: ''
    };
  }

  processForm () {
    console.log(this.profile);
    this.submitted = true;
  }
}
