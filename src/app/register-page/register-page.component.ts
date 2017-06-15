import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit{
  public registerForm: FormGroup;

  constructor (private fb: FormBuilder) {}

  public ngOnInit() {
    this.registerForm = this.fb.group({
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  public submitRegicterForm() {
    console.log(this.registerForm);
  }
}
