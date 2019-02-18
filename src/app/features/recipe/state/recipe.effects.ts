import { Injectable } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { tap, mergeMap, catchError, map, withLatestFrom } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { AppState } from "@app/features/recipe/state";
import { ApiService } from "@app/services/api.service";
import {
  LoadRecipes,
  LoadRecipesSuccess,
  RecipeActionTypes,
  CreateRecipe,
  CreateRecipeSuccess,
  UpdateRecipe,
  UpdateRecipeSuccess,
  DeleteRecipe,
  DeleteRecipeSuccess,
  LoadRecipe,
  LoadRecipeSuccess,
  UpvoteRecipe,
  DownvoteRecipe
} from "./recipe.actions";
import { RemoveError, AddError } from "@app/store/actions/error.actions";

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

  @Effect()
  loadRecipe$: Observable<Action> = this.action$.pipe(
    ofType<LoadRecipe>(RecipeActionTypes.LOAD_RECIPE),
    tap(() => this.store.dispatch(new RemoveError())),
    withLatestFrom(this.store),
    mergeMap(([action, state]: [LoadRecipe, AppState]) => {
      // check if recipe is in state already
      const recipe = state.recipes.recipes[action.payload];
      if (recipe) {
        // do nothing
        return of(new LoadRecipeSuccess());
      } else {
        // load recipe
        return this.apiService.getRecipe(action.payload).pipe(
          mergeMap(res => of(new LoadRecipeSuccess(res))),
          catchError(err => of(new AddError(err.error)))
        );
      }
    })
  );

  @Effect()
  createRecipe$: Observable<Action> = this.action$.pipe(
    ofType<CreateRecipe>(RecipeActionTypes.CREATE_RECIPE),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.apiService.createRecipe(action.payload).pipe(
        map(recipe => new CreateRecipeSuccess(recipe)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  updateRecipe$: Observable<Action> = this.action$.pipe(
    ofType<UpdateRecipe>(RecipeActionTypes.UPDATE_RECIPE),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.apiService.updateRecipe(action.payload.id, action.payload).pipe(
        map(recipe => new UpdateRecipeSuccess(recipe)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  deleteRecipe$: Observable<Action> = this.action$.pipe(
    ofType<DeleteRecipe>(RecipeActionTypes.DELETE_RECIPE),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.apiService.deleteRecipe(action.payload).pipe(
        map(recipe => new DeleteRecipeSuccess(recipe.id)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  upvoteRecipe$: Observable<Action> = this.action$.pipe(
    ofType<UpvoteRecipe>(RecipeActionTypes.UPVOTE_RECIPE),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.apiService.upvoteRecipe(action.payload).pipe(
        map(recipe => new UpdateRecipeSuccess(recipe)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  downvoteRecipe$: Observable<Action> = this.action$.pipe(
    ofType<DownvoteRecipe>(RecipeActionTypes.DOWNVOTE_RECIPE),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.apiService.downvoteRecipe(action.payload).pipe(
        map(recipe => new UpdateRecipeSuccess(recipe)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );
}
