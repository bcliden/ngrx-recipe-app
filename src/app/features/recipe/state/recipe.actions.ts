import { Action } from "@ngrx/store";
import { Recipe, RecipeDTO } from "@app/models/recipe";

export enum RecipeActionTypes {
  LOAD_RECIPES = "[Recipe] Load Recipes",
  LOAD_RECIPES_SUCCESS = "[Recipe] Load Recipes Success",

  LOAD_RECIPE = "[Recipe] Load Recipe",
  LOAD_RECIPE_SUCCESS = "[Recipe] Load Recipe Success",

  CREATE_RECIPE = "[Recipe] Create Recipe",
  CREATE_RECIPE_SUCCESS = "[Recipe] Create Recipe Success",

  UPDATE_RECIPE = "[Recipe] Update Recipe",
  UPDATE_RECIPE_SUCCESS = "[Recipe] Update Recipe Success",

  DELETE_RECIPE = "[Recipe] Delete Recipe",
  DELETE_RECIPE_SUCCESS = "[Recipe] Delete Recipe Success",

  UPVOTE_RECIPE = "[Recipe] Upvote Recipe",
  DOWNVOTE_RECIPE = "[Recipe] Downvote Recipe"
}

// load
export class LoadRecipes implements Action {
  readonly type = RecipeActionTypes.LOAD_RECIPES;
}

export class LoadRecipesSuccess implements Action {
  readonly type = RecipeActionTypes.LOAD_RECIPES_SUCCESS;
  constructor(public payload: Recipe[]) {}
}

export class LoadRecipe implements Action {
  readonly type = RecipeActionTypes.LOAD_RECIPE;
  constructor(public payload: string) {}
}

export class LoadRecipeSuccess implements Action {
  readonly type = RecipeActionTypes.LOAD_RECIPE_SUCCESS;
  constructor(public payload?: Recipe) {}
}

// create
export class CreateRecipe implements Action {
  readonly type = RecipeActionTypes.CREATE_RECIPE;
  constructor(public payload: RecipeDTO) {}
}

export class CreateRecipeSuccess implements Action {
  readonly type = RecipeActionTypes.CREATE_RECIPE_SUCCESS;
  constructor(public payload: Recipe) {}
}

// update
export class UpdateRecipe implements Action {
  readonly type = RecipeActionTypes.UPDATE_RECIPE;
  constructor(public payload: Partial<RecipeDTO>) {}
}

export class UpdateRecipeSuccess implements Action {
  readonly type = RecipeActionTypes.UPDATE_RECIPE_SUCCESS;
  constructor(public payload: Recipe) {}
}

// delete
export class DeleteRecipe implements Action {
  readonly type = RecipeActionTypes.DELETE_RECIPE;
  constructor(public payload: string) {}
}

export class DeleteRecipeSuccess implements Action {
  readonly type = RecipeActionTypes.DELETE_RECIPE_SUCCESS;
  constructor(public payload: string) {}
}

// voting
export class UpvoteRecipe implements Action {
  readonly type = RecipeActionTypes.UPVOTE_RECIPE;
  constructor(public payload: string) {}
}

export class DownvoteRecipe implements Action {
  readonly type = RecipeActionTypes.DOWNVOTE_RECIPE;
  constructor(public payload: string) {}
}

export type ActionsUnion =
  | LoadRecipes
  | LoadRecipesSuccess
  | LoadRecipe
  | LoadRecipeSuccess
  | CreateRecipe
  | CreateRecipeSuccess
  | UpdateRecipe
  | UpdateRecipeSuccess
  | DeleteRecipe
  | DeleteRecipeSuccess
  | UpvoteRecipe
  | DownvoteRecipe;
