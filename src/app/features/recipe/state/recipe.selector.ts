import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecipeState } from ".";
import { Recipe } from "@app/models/recipe";
import { Entity } from "@app/models/entity";

export const selectRecipeState = createFeatureSelector<RecipeState>("recipes");

export const selectAllRecipes = createSelector(
  selectRecipeState,
  (recipeState: RecipeState) => {
    const { recipes }: { recipes: Entity<Recipe> } = recipeState;
    return Object.keys(recipes).map(id => recipes[id]);
  }
);
