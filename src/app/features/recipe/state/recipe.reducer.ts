import { RecipeState } from ".";
import { ActionsUnion, RecipeActionTypes } from "./recipe.action";

const initialState: RecipeState = {
  recipes: {},
  loading: false,
  loaded: false,
  selectedRecipe: null
};

export function recipeReducer(
  state = initialState,
  action: ActionsUnion
): RecipeState {
  switch (action.type) {
    case RecipeActionTypes.LOAD_RECIPES:
      return { ...state, loading: true, loaded: false };
    case RecipeActionTypes.LOAD_RECIPE:
      return {
        ...state,
        selectedRecipe: action.payload,
        loading: true,
        loaded: false
      };
    case RecipeActionTypes.CREATE_RECIPE:
      return { ...state, loading: true, loaded: false };
    case RecipeActionTypes.UPDATE_RECIPE:
      return { ...state, loading: true, loaded: false };
    case RecipeActionTypes.DELETE_RECIPE:
      return { ...state, loading: true, loaded: false };

    case RecipeActionTypes.LOAD_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.payload.reduce((acc, recipe) => {
          return { ...acc, [recipe.id]: recipe };
        }, state.recipes),
        loading: false,
        loaded: true
      };

    case RecipeActionTypes.LOAD_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: action.payload
          ? { ...state.recipes, [action.payload.id]: action.payload }
          : state.recipes,
        loading: false,
        loaded: true
      };

    case RecipeActionTypes.CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: { ...state.recipes, [action.payload.id]: action.payload },
        loading: false,
        loaded: true
      };

    case RecipeActionTypes.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: { ...state.recipes, [action.payload.id]: action.payload },
        loading: false,
        loaded: true
      };
    case RecipeActionTypes.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: Object.keys(state.recipes)
          .filter(key => key !== action.payload)
          .reduce((acc, key) => ({ ...acc, key: state[key] }), {}),
        loading: false,
        loaded: true
      };

    default:
      return state;
  }
}
