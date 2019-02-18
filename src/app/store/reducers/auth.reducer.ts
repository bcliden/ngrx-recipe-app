import { ActionsUnion, AuthActionTypes } from "@app/store/actions/auth.actions";
import { User } from "@app/models/user";

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  loading: false
};

export function authReducer(
  state = initialState,
  action: ActionsUnion
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER:
      return { ...state, loading: true };
    case AuthActionTypes.REGISTER_USER:
      return { ...state, loading: true };
    case AuthActionTypes.SET_INITIAL_USER:
      return { ...state, loading: true };
    case AuthActionTypes.SET_CURRENT_USER:
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
}
