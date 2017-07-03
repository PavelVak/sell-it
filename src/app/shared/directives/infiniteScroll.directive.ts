import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[infiniteScroll]',

})

export class InfiniteScrollDirective {

  @Output() public endOfPage: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('window:scroll')
  public scrollPage() {
    // tslint:disable
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;

    if(scrollTop + window.innerHeight + 100 >= document.body.scrollHeight) {
      this.endOfPage.emit();
    }
  }
}
