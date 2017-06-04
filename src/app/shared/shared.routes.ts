import {Routes} from "@angular/router";
import {LoginPageComponent} from "../login-page";
import {RegisterPageComponent} from "../register-page/register-page.component";

export const SHARED_ROUTES: Routes = [
    { path: 'login', component: LoginPageComponent},
    { path: 'register', component: RegisterPageComponent},
];
