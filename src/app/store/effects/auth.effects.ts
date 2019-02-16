import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { mergeMap, catchError, map, tap } from "rxjs/operators";
import { Action, Store } from "@ngrx/store";

import { AuthService } from "@app/services/auth.service";
import {
  SetInitialUser,
  AuthActionTypes,
  SetCurrentUser,
  LoginUser,
  RegisterUser
} from "../actions/auth.action";
import { User } from "@app/models/user";
import { AddError, RemoveError } from "../actions/error.action";
import { AppState } from "../app-store.module";

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  @Effect()
  setInitialUser$: Observable<Action> = this.action$.pipe(
    // find observables of this type
    ofType<SetInitialUser>(AuthActionTypes.SET_INITIAL_USER),
    // remove any old errors
    tap(() => this.store.dispatch(new RemoveError())),
    // merge action into appropriate authService method
    mergeMap((action: SetInitialUser) =>
      this.authService.whoami().pipe(
        // dispatch set current
        map((user: User) => new SetCurrentUser(user)),
        // else add error
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  loginUser$: Observable<Action> = this.action$.pipe(
    ofType<LoginUser>(AuthActionTypes.LOGIN_USER),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap((action: LoginUser) =>
      this.authService.login(action.payload).pipe(
        map((user: User) => new SetCurrentUser(user)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  registerUser$: Observable<Action> = this.action$.pipe(
    ofType<RegisterUser>(AuthActionTypes.REGISTER_USER),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap((action: RegisterUser) =>
      this.authService.register(action.payload).pipe(
        map((user: User) => new SetCurrentUser(user)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );
}
