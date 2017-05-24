import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[scrollTop]',
  host: {
    '(click)': 'onClick()',
    '(window:scroll)': 'onScroll()'
  }
})

export class ScrollTopDirective {

  constructor(private elementRef: ElementRef) {
      this.elementRef.nativeElement.style = 'display: none';
  }

  onClick() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  onScroll() {
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset ||  document.body.scrollTop || 0;

    if (scrollTop + document.body.clientHeight >= document.body.offsetHeight + 150) {
      this.elementRef.nativeElement.style = 'display: block';
    }
    else
      this.elementRef.nativeElement.style = 'display: none';
  }
}
