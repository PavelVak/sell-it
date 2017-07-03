import { AbstractControl } from '@angular/forms';

export function customFloatValidator (control: AbstractControl): {[key: string]: boolean} | null {
    if (!(!isNaN(parseFloat(control.value)) && isFinite(control.value))) {
      return { customFloat : true };
    }
    return null;
}
