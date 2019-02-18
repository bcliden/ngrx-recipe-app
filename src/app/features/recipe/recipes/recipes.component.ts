import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Store, select } from "@ngrx/store";

import { Recipe } from "@app/models/recipe";
import { AppState } from "@app/features/recipe/state";
import {
  LoadRecipes,
  UpvoteRecipe,
  DownvoteRecipe
} from "../state/recipe.actions";
import { selectAllRecipes, selectRecipeLoader } from "../state/recipe.selector";
import { takeUntil, tap } from "rxjs/operators";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.scss"]
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  loading$: Observable<boolean>;
  private unsubscribe$ = new Subject<void>();
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadRecipes());

    const recipes$ = this.store
      .select(selectAllRecipes)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => (this.recipes = val));

    this.loading$ = this.store.select(selectRecipeLoader);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  upvote(id: string) {
    this.store.dispatch(new UpvoteRecipe(id));
  }
  downvote(id: string) {
    this.store.dispatch(new DownvoteRecipe(id));
  }
}
