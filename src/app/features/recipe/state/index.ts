import { Recipe } from "@app/models/recipe";
import * as Store from "@app/store/app-store.module";
import { Entity } from "@app/models/entity";

export interface RecipeState {
  recipes: Entity<Recipe>;
  loading: boolean;
  loaded: boolean;
}

export interface AppState extends Store.AppState {
  recipes: RecipeState;
  u;
}
