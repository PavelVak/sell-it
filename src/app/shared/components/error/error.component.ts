import { Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'sellit-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})

export class ErrorComponent implements OnChanges{
  @Input()
  labelText: string = '';
  @Input()
  inputErrors: any;
  @Input()
  inputField: any;
  @Input()
  errorDefs: any;

  errorMessage: string = '';

  ngOnChanges(changes:any): void {
    let errors:any = changes.inputErrors.currentValue;

    this.errorMessage = '';
    if (errors) {
      Object.keys(this.errorDefs).some((key) => {
        if (errors[key]) {
          this.errorMessage = this.errorDefs[key];
          return true;
        }
      });
    }
  }
}
