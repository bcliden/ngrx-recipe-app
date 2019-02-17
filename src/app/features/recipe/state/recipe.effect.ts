import { Injectable } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { tap, mergeMap, catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { AppState } from "@app/features/recipe/state";
import { ApiService } from "@app/services/api.service";
import {
  LoadRecipes,
  LoadRecipesSuccess,
  RecipeActionTypes
} from "./recipe.action";
import { RemoveError, AddError } from "@app/store/actions/error.action";

@Injectable()
export class RecipeEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private apiService: ApiService
  ) {}

  @Effect()
  loadRecipes$: Observable<Action> = this.action$.pipe(
    ofType<LoadRecipes>(RecipeActionTypes.LOAD_RECIPES),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(() =>
      this.apiService.getRecipes().pipe(
        map(users => new LoadRecipesSuccess(users)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );
}
