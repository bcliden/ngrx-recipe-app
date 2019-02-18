import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Recipe } from "@app/models/recipe";
import { AppState } from "@app/features/recipe/state";
import { LoadRecipes } from "../state/recipe.actions";
import { selectAllRecipes } from "../state/recipe.selector";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.scss"]
})
export class RecipesComponent implements OnInit {
  recipes: Observable<Recipe[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadRecipes());
    this.recipes = this.store.select(selectAllRecipes);
  }
}
