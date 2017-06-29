import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileGuards } from './user-profile.guards';

export const userProfileRoute: Routes = [
  { path: '', component: UserProfileComponent, canActivate: [UserProfileGuards] }

];
