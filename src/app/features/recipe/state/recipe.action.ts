import { Action } from "@ngrx/store";
import { Recipe } from "@app/models/recipe";

export enum RecipeActionTypes {
  LOAD_RECIPES = "[Recipes] Load recipes",
  LOAD_RECIPES_SUCCESS = "[Recipes] Load recipes success"
}

export class LoadRecipes implements Action {
  readonly type = RecipeActionTypes.LOAD_RECIPES;
}

export class LoadRecipesSuccess implements Action {
  readonly type = RecipeActionTypes.LOAD_RECIPES_SUCCESS;
  constructor(public payload: Recipe[]) {}
}

export type ActionsUnion = LoadRecipes | LoadRecipesSuccess;
