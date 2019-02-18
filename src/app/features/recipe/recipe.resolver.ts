import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

import { AppState } from "./state";
import { LoadRecipe } from "./state/recipe.actions";

@Injectable()
export class RecipeResolver implements Resolve<Subscription> {
  constructor(private store: Store<AppState>) {}
  resolve() {
    return this.store
      .select(state => state.router.state.params.id)
      .pipe(take(1))
      .subscribe(id => this.store.dispatch(new LoadRecipe(id)));
  }
}
