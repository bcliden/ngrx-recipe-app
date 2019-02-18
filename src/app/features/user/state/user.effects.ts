import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store, Action } from "@ngrx/store";
import { AppState } from ".";
import { ApiService } from "@app/services/api.service";
import { Observable, of } from "rxjs";
import { LoadUsers, UserActionTypes, LoadUsersSuccess } from "./user.actions";
import { mergeMap, catchError, map, tap } from "rxjs/operators";
import { AddError, RemoveError } from "@app/store/actions/error.actions";

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private apiService: ApiService
  ) {}

  @Effect()
  loadUsers$: Observable<Action> = this.action$.pipe(
    ofType<LoadUsers>(UserActionTypes.LOAD_USERS),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(() =>
      this.apiService.getUsers().pipe(
        map(users => new LoadUsersSuccess(users)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );
}
