import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/app-store.module";
import { take, map } from "rxjs/operators";
import { uuid } from "@app/utility/uuid";

@Injectable({
  providedIn: "root"
})
export class UUIDGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store
      .select(state => state.router.state.params.id)
      .pipe(
        take(1),
        map(val => uuid.test(val))
      );
  }
}
