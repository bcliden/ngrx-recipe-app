import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppState } from "../state";
import { Store } from "@ngrx/store";
import {
  selectCurrentRecipe,
  selectRecipeLoader
} from "../state/recipe.selector";
import { Observable, Subject } from "rxjs";
import { Recipe } from "@app/models/recipe";
import { takeUntil } from "rxjs/operators";
import { UpvoteRecipe, DownvoteRecipe } from "../state/recipe.actions";
import { User } from "@app/models/user";

@Component({
  selector: "app-selected-recipe",
  templateUrl: "./selected-recipe.component.html",
  styleUrls: ["./selected-recipe.component.scss"]
})
export class SelectedRecipeComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  currentUser: User;
  loading$: Observable<boolean>;
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.loading$ = this.store.select(selectRecipeLoader);

    this.store
      .select(selectCurrentRecipe)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => (this.selectedRecipe = val));

    this.store
      .select(state => state.auth.user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => (this.currentUser = user));
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
