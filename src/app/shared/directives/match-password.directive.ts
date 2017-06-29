import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[matchPassword]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatchPasswordDirective), multi: true }
  ]
})
export class MatchPasswordDirective implements Validator {
  constructor( @Attribute('matchPassword') public matchPassword: string) {}

  public validate(control: AbstractControl): { [key: string]: any } {
    let confirmPassword = control.value;
    let password = control.root.get(this.matchPassword);

    if (password && confirmPassword !== password.value) {
      console.log('password does not match!');
      return {validateEqual: false};
    }
    return null;
  }
}
