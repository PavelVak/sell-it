import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/header/search/search.component';
import { UserPanelComponent } from './components/header/user-panel/user-panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { BtnScrollTopComponent } from './components/btnScrollTop/btnScrollTop.component';
import { ScrollTopDirective } from './directives/scrollTop.directive';
import { InfiniteScrollDirective } from './directives/infiniteScroll.directive';
import { LengthValidDirective } from './directives/length-validation.directive';
import { FloatValidDirective } from './directives/float-validator.directive';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
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
    ErrorComponent
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
    UserPanelComponent,
    FooterComponent,
    ErrorComponent,
    BtnScrollTopComponent,
    ScrollTopDirective,
    InfiniteScrollDirective,
    LengthValidDirective,
    FloatValidDirective,
  ]
})
export class SharedModule {
}
