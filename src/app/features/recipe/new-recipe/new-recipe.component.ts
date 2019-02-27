import { Component } from "@angular/core";
import { AppState } from "../state";
import { Store } from "@ngrx/store";
import { RecipeDTO } from "@app/models/recipe";
import { CreateRecipe } from "../state/recipe.actions";

@Component({
  selector: "app-new-recipe",
  templateUrl: "./new-recipe.component.html",
  styleUrls: ["./new-recipe.component.scss"]
})
export class NewRecipeComponent {
  constructor(private store: Store<AppState>) {}

  submit(e: RecipeDTO) {
    this.store.dispatch(new CreateRecipe(e));
  }
}
