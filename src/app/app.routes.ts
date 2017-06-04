import { Routes} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NoContentPageComponent } from './nocontent-page/nocontent-page.component';
import { ItemDetailResolver } from './products/services/detail.resolver';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ChatComponent } from './chat/chat.component';

// import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomePageComponent},
  { path: 'home',  component: HomePageComponent},
  { path: 'detail/:id', component: DetailPageComponent, resolve: { itemDetails: ItemDetailResolver }},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  {path: 'chat', component: ChatComponent},
  { path: '**',    component: NoContentPageComponent }
];
