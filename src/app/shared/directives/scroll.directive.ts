import {Directive, HostListener} from "@angular/core";

@Directive({
  selector: "[scroll]"
})

export class ScrollDirective{
  constructor(){
    console.log("Work it!!!");
  }
  @HostListener("window:scroll", ["$event"])
  public onScroll($event){
    console.log("Scroll it", $event)
  }
}
