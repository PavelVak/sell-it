import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fileValidator(fileNames: any): ValidatorFn {
  debugger;
  return (c: AbstractControl) : {[key: string]: boolean} | null => {

    if (!fileNames) return {required: true};
    return null;
  };
}
