import { ActionsUnion, ErrorActionTypes } from "../actions/error.actions";

export interface ErrorState {
  error: any;
}

const initialState: ErrorState = {
  error: null
};

export function errorReducer(
  state: ErrorState,
  action: ActionsUnion
): ErrorState {
  switch (action.type) {
    case ErrorActionTypes.ADD_ERROR:
      return { ...state, error: action.payload };
    case ErrorActionTypes.REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
