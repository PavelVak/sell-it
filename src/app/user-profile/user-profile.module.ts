import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {userProfileRoute} from "./user-profile.routes";
import {UserProfileGuards} from "./user-profile.guards";

@NgModule({
  declarations: [ UserProfileComponent ],
  exports: [ UserProfileComponent ],
  imports: [SharedModule, RouterModule.forChild(userProfileRoute)],
  providers: [UserProfileGuards]
})

export class UserProfileModule {}
