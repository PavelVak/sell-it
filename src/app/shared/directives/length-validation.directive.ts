import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[lengthValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: LengthValidDirective, multi: true}]
})
export class LengthValidDirective implements Validator {

  @Input() MaxLength: any;

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | any {
    if (control.value && control.value.length > this.MaxLength - 1) {
      console.log('invalid');
      return {invalid: true};
    }
    return null;
  }

}
