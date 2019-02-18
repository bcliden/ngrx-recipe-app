import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { UIModule } from "@app/ui.module";
import { userReducer } from "./state/user.reducer";
import { UserEffects } from "./state/user.effects";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [{ path: "", component: UsersComponent }];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UIModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature("users", userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule {}
