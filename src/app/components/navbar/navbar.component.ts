import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "@app/services/auth.service";
import { MenuItem } from "primeng/components/common/menuitem";
import { SetCurrentUser } from "@app/store/actions/auth.actions";
import { AppState } from "@app/store/app-store.module";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { User } from "@app/models/user";
import { Observable, Subject } from "rxjs";
import { tap, takeUntil, filter } from "rxjs/operators";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  username: string | null;
  items: MenuItem[] = [
    {
      label: "Home",
      routerLink: ["/"],
      icon: "fa fa-home"
    },
    {
      label: "Users",
      routerLink: ["/users"],
      icon: "fa fa-user"
    },
    {
      label: "Recipes",
      routerLink: ["/recipes"],
      icon: "fa fa-cutlery"
    }
  ];

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    const user$ = this.store
      .select(state => state.auth.user && state.auth.user.username)
      .pipe(
        // filter(v => v !== null),
        // tap(v => console.log("hi ", v)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(val => (this.username = val));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClick() {
    if (this.authService.token) {
      this.authService.token = null;
      this.store.dispatch(new SetCurrentUser(null));
    }
    this.router.navigate(["/auth"]);
  }
}
