import { UserState } from ".";
import { ActionsUnion, UserActionTypes } from "./user.actions";

const initialState: UserState = {
  loading: false,
  users: []
};

export function userReducer(
  state = initialState,
  action: ActionsUnion
): UserState {
  switch (action.type) {
    case UserActionTypes.LOAD_USERS: {
      return { ...state, loading: true };
    }
    case UserActionTypes.LOAD_USERS_SUCCESS: {
      const users = action.payload;
      return { ...state, users, loading: false };
    }
    default:
      return state;
  }
}
