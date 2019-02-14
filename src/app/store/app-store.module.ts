import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule, ActionReducerMap } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { errorReducer, ErrorState } from "./reducers/error.reducer";

export interface AppState {
  error: ErrorState;
}

export const reducers: ActionReducerMap<AppState> = {
  error: errorReducer
};

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument()
  ]
})
export class AppStoreModule {}
