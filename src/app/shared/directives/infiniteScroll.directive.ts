import { Directive, Output, EventEmitter } from "@angular/core";

@Directive({
  selector: '[infiniteScroll]',
  host: {
    '(window:scroll)':'onScroll()'
  }
})

export class InfiniteScrollDirective {

  constructor(){}

  @Output() endOfPage:EventEmitter<any> = new EventEmitter<any>();

  onScroll() {
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;

    if(scrollTop + window.innerHeight + 100 >= document.body.scrollHeight) {
      this.endOfPage.emit();
    }
  }
}
