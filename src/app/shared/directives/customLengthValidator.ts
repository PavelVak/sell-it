import {AbstractControl, ValidatorFn} from "@angular/forms";

export function customLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (control.value && control.value.length > length - 1) {
      return {'customMaxLength' : true}
    }
    return null;
  }
}
