import { Recipe } from "@app/models/recipe";
import * as Store from "@app/store/app-store.module";

export interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  loaded: boolean;
}

export interface AppState extends Store.AppState {
  recipes: RecipeState;
}
