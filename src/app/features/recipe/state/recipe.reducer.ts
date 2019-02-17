import { RecipeState } from ".";
import { ActionsUnion, RecipeActionTypes } from "./recipe.action";

const initialState: RecipeState = {
  recipes: {},
  loading: false,
  loaded: false
};

export function recipeReducer(
  state = initialState,
  action: ActionsUnion
): RecipeState {
  switch (action.type) {
    case RecipeActionTypes.LOAD_RECIPES: {
      return { ...state, loading: true, loaded: false };
    }
    case RecipeActionTypes.LOAD_RECIPES_SUCCESS: {
      const recipes = action.payload.reduce((acc, recipe) => {
        return { ...acc, [recipe.id]: recipe };
      }, state.recipes);
      return { ...state, recipes, loading: false, loaded: true };
    }
    default:
      return state;
  }
}
