import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";

import { AppState } from "@app/store/app-store.module";
import { validateWhitespace } from "@app/utility/validators";
import { LoginUser, RegisterUser } from "@app/store/actions/auth.actions";
import { AuthDTO } from "@app/models/auth";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  loading: boolean = false;
  unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      username: this.fb.control("", [Validators.required, validateWhitespace]),
      password: this.fb.control("", [Validators.required, validateWhitespace])
    });

    this.store
      .select(state => state.auth)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.loading = val.loading;
        if (val.user && val.loading !== true) {
          this.router.navigate(["/"]);
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login() {
    const val: AuthDTO = this.authForm.getRawValue();
    this.store.dispatch(new LoginUser(val));
  }

  register() {
    const val: AuthDTO = this.authForm.getRawValue();
    this.store.dispatch(new RegisterUser(val));
  }
}
