import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[floatValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: FloatValidDirective, multi: true}]
})
export class FloatValidDirective implements Validator {

  public validate(control: AbstractControl): ValidationErrors | any {
    console.log('jih');
    if (!isNaN(parseFloat(control.value)) && isFinite(control.value)) {
      console.log('invalid');
      return null;
    }
    return {invalid: true};
  }

}
