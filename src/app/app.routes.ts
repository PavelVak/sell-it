import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NoContentPageComponent } from './nocontent-page/nocontent-page.component';
import { ItemDetailResolver } from './products/services/detail.resolver';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ChatComponent } from './chat/chat.component';
import { AddProductPageComponent } from './add-product-page/add-product-page.component';

import { EditProfilePageComponent } from './edit-profile/edit-profile-page.component';
import { CanActivateAuthGuard } from './core/guards/auth.guard';
import { CanActivateNoAuthGuard } from  './core/guards/no-auth.guard';
import { SliderComponent } from './slider/slider.component';

// import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: 'slider', component: SliderComponent},
  { path: '',      component: HomePageComponent},
  { path: 'home',  component: HomePageComponent},
  { path: 'detail/:id', component: DetailPageComponent, resolve: { itemDetails: ItemDetailResolver }},
  { path: 'login', component: LoginPageComponent, canActivate: [CanActivateAuthGuard]},
  { path: 'register', component: RegisterPageComponent, canActivate: [CanActivateAuthGuard]},
  { path: 'chat', component: ChatComponent, canActivate: [CanActivateNoAuthGuard]},
  { path: 'add-product', component: AddProductPageComponent},
  { path: 'edit-profile', component: EditProfilePageComponent, canActivate: [CanActivateNoAuthGuard]},
  { path: 'user', loadChildren: 'app/user-profile/user-profile.module#UserProfileModule'},
  { path: '**',    component: NoContentPageComponent },

];
