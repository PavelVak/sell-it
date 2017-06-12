import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/header/search/search.component';
import { UserPanelComponent } from './components/header/user-panel/user-panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { BtnScrollTopComponent } from './components/btnScrollTop/btnScrollTop.component';
import { ScrollTopDirective } from './directives/scrollTop.directive';
import { InfiniteScrollDirective } from './directives/infiniteScroll.directive';
import { LengthValidDirective } from "./directives/length-validation.directive";
import { FloatValidDirective } from "./directives/float-validator.directive";
import { MatchPasswordDirective } from "./directives/match-password.directive";
import { RouterModule } from "@angular/router";
import { SHARED_ROUTES } from "./shared.routes";
import { CommonModule } from "@angular/common";


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    SearchComponent,
    UserPanelComponent,
    FooterComponent,
    BtnScrollTopComponent,
    ScrollTopDirective,
    InfiniteScrollDirective,
    LengthValidDirective,
    FloatValidDirective,
    MatchPasswordDirective
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
    UserPanelComponent,
    FooterComponent,
    BtnScrollTopComponent,
    ScrollTopDirective,
    InfiniteScrollDirective,
    LengthValidDirective,
    FloatValidDirective,
    MatchPasswordDirective
  ]
})
export class SharedModule {
}
