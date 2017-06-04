import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/header/search/search.component';
import { UserPanelComponent } from './components/header/user-panel/user-panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { BtnScrollTopComponent } from './components/btnScrollTop/btnScrollTop.component';
import { ScrollTopDirective } from './directives/scrollTop.directive';
import { InfiniteScrollDirective } from './directives/infiniteScroll.directive';
import {RouterModule} from "@angular/router";
import {SHARED_ROUTES} from "./shared.routes";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild(SHARED_ROUTES)
  ],
  declarations: [
    HeaderComponent,
    SearchComponent,
    UserPanelComponent,
    FooterComponent,
    BtnScrollTopComponent,
    ScrollTopDirective,
    InfiniteScrollDirective
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
    UserPanelComponent,
    FooterComponent,
    BtnScrollTopComponent,
    ScrollTopDirective,
    InfiniteScrollDirective
  ]
})
export class SharedModule {
}
