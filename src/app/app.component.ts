import { Component, OnInit } from "@angular/core";
import { AppState } from "./store/app-store.module";
import { Store } from "@ngrx/store";
import { AddError } from "./store/actions/error.actions";
import {
  LoginUser,
  SetCurrentUser,
  SetInitialUser
} from "./store/actions/auth.actions";
import { AuthDTO } from "./models/auth";
import { MessageService } from "primeng/components/common/messageservice";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "recipe-app";

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.token) {
      this.store.dispatch(new SetInitialUser());
    }
    this.store
      .select(state => state.error)
      .subscribe(val => this.showError(val));
  }

  showError(val) {
    if (val && val.error) {
      this.messageService.add({
        severity: "error",
        summary: "Error Message",
        detail: val.error.message || "Internal server error"
      });
    }
  }
}
