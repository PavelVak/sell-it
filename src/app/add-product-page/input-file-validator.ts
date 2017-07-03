import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fileValidator(fileNames: any): ValidatorFn {
  return (c: AbstractControl) : {[key: string]: boolean} | null => {

    if (!fileNames) {
      return {required: true};
    }
    return null;
  };
}
