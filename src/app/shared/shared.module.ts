import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";

import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ScrollDirective} from "./directive/scroll.directive";



@NgModule({
  imports: [BrowserModule],
  declarations: [HeaderComponent, FooterComponent, ScrollDirective],
  exports: [HeaderComponent, FooterComponent, ScrollDirective]
})
export class SharedModule{}
