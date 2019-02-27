import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Recipe, RecipeDTO } from "@app/models/recipe";
import { AppState } from "../state";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import {
  selectRecipeLoader,
  selectCurrentRecipe
} from "../state/recipe.selector";
import { withLatestFrom, takeUntil } from "rxjs/operators";
import { UpdateRecipe } from "../state/recipe.actions";

@Component({
  selector: "app-edit-recipe",
  templateUrl: "./edit-recipe.component.html",
  styleUrls: ["./edit-recipe.component.scss"]
})
export class EditRecipeComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  recipe: Recipe;
  loading$: Observable<boolean>;
  processSubmission: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.loading$ = this.store.select(selectRecipeLoader);

    this.store
      .select(selectCurrentRecipe)
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.store)
      )
      .subscribe(([recipe, store]) => {
        const currentUser = store.auth.user;
        this.recipe = recipe;
        if (currentUser && recipe && recipe.author.id !== currentUser.id) {
          this.router.navigate(["/recipes"]);
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submit(e: RecipeDTO) {
    this.processSubmission = true;
    this.store.dispatch(new UpdateRecipe({ ...e, id: this.recipe.id }));
    this.router.navigate(["recipes", this.recipe.id]);
  }
}
