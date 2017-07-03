import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollTop]',
})

export class ScrollTopDirective {

  constructor(private elementRef: ElementRef) {
      this.elementRef.nativeElement.style = 'display: none';
  }
  @HostListener('click')
  public clickBtnTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  @HostListener('window:scroll')
  public scrollTopWindow() {
    // tslint:disable
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset ||  document.body.scrollTop || 0;

    if (scrollTop + document.body.clientHeight >= document.body.offsetHeight + 150) {
      this.elementRef.nativeElement.style = 'display: block';
    }
    else
      this.elementRef.nativeElement.style = 'display: none';
  }
}
