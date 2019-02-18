import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppState } from "../state";
import { Store } from "@ngrx/store";
import { selectCurrentRecipe } from "../state/recipe.selector";
import { Subscription } from "rxjs";
import { Recipe } from "@app/models/recipe";

@Component({
  selector: "app-selected-recipe",
  templateUrl: "./selected-recipe.component.html",
  styleUrls: ["./selected-recipe.component.scss"]
})
export class SelectedRecipeComponent implements OnInit, OnDestroy {
  private subscription$: Subscription;
  recipe: Recipe;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription$ = this.store
      .select(selectCurrentRecipe)
      .subscribe(val => (this.recipe = val));
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
