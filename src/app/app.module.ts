import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomePageComponent } from './home-page';
import { LoginPageComponent } from './login-page';
import { DetailPageComponent } from './detail-page';
import { ProductListComponent } from './products/products-list/product-list.component';
import { ProductItemComponent } from './products/product-item/product-item.component';

import { SharedModule } from './shared/shared.module';
import { UserService } from './home-page/user.service';
import { HttpService } from './products/services/http.service';
import { HttpConfigService } from './products/services/http-config.service';

import '../styles/styles.scss';
import '../styles/headings.css';
import { NoContentPageComponent } from './nocontent-page/nocontent-page.component';
import { ItemDetailResolver } from './products/services/detail.resolver';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ChatModule } from './chat/chat.module';
import { AddProductPageComponent } from './add-product-page/add-product-page.component';
import { EditProfilePageComponent } from './edit-profile/edit-profile-page.component';
import { MyAuthService } from './core/myAuth.service';
import { CookieModule } from 'ngx-cookie';
import { ApiHttp } from './core/api-http.srvice';
import { SessionService } from './core/session.service';
import { CanActivateAuthGuard } from './core/guards/auth.guard';
import { CanActivateNoAuthGuard } from './core/guards/no-auth.guard';
import { EditUserService } from './edit-profile/services/edit-user.service';
import { ProfileService } from './core/profile.service';
import { SearchService } from './shared/components/header/search/search.service';
import { SliderComponent } from './slider/slider.component';
import { SwiperModule } from 'angular2-useful-swiper';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    DetailPageComponent,
    ProductListComponent,
    ProductItemComponent,
    NoContentPageComponent,
    RegisterPageComponent,
    AddProductPageComponent,
    EditProfilePageComponent,
    SliderComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
    CookieModule.forRoot(),
    SharedModule,
    ChatModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    SwiperModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    UserService,
    HttpService,
    MyAuthService,
    HttpConfigService,
    ItemDetailResolver,
    {
      provide: Http,
      useClass: ApiHttp,
      deps: [XHRBackend, RequestOptions, SessionService]
    },
    SessionService,
    CanActivateAuthGuard,
    CanActivateNoAuthGuard,
    EditUserService,
    ProfileService,
    SearchService,
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
