import { UserState } from ".";
import { ActionsUnion, UserActionTypes } from "./user.action";

const initialState: UserState = {
  loaded: false,
  loading: false,
  users: []
};

export function userReducer(
  state = initialState,
  action: ActionsUnion
): UserState {
  switch (action.type) {
    case UserActionTypes.LOAD_USERS: {
      return { ...state, loaded: false, loading: true };
    }
    case UserActionTypes.LOAD_USERS_SUCCESS: {
      const users = action.payload;
      return { ...state, users, loaded: true, loading: false };
    }
    default:
      return state;
  }
}
