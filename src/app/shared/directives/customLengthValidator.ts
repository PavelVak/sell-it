import {AbstractControl, ValidatorFn} from "@angular/forms";

export function customLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (control.value && control.value.replace(/<{1}[^<>]{1,}>{1}/g,"").replace(/&nbsp;/g, '').replace(/&amp;/g, ' ').length > length - 1) {
      return {'customMaxLength' : true}
    }
    return null;
  }
}
