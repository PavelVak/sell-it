import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";

import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {BtnScrollTopComponent} from "./components/btnScrollTop/btnScrollTop.component";
import { ScrollTopDirective } from './directives/scrollTop.directive';
import {InfiniteScrollDirective} from "./directives/infiniteScroll.directive";



@NgModule({
  imports: [BrowserModule],
  declarations: [HeaderComponent, FooterComponent, BtnScrollTopComponent, ScrollTopDirective, InfiniteScrollDirective],
  exports: [HeaderComponent, FooterComponent, BtnScrollTopComponent, ScrollTopDirective, InfiniteScrollDirective]
})
export class SharedModule{}
