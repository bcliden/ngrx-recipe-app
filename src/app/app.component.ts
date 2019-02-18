import { Component, OnInit } from "@angular/core";
import { AppState } from "./store/app-store.module";
import { Store } from "@ngrx/store";
import { AddError } from "./store/actions/error.action";
import {
  LoginUser,
  SetCurrentUser,
  SetInitialUser
} from "./store/actions/auth.action";
import { AuthDTO } from "./models/auth";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "recipe-app";

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // this.store.dispatch(
    //   new LoginUser(<AuthDTO>{
    //     username: "username",
    //     password: "password"
    //   })
    // );
    this.store
      .select(state => state.error)
      .subscribe(val => this.showError(val.error));
  }

  showError(err) {
    if (err) {
      this.messageService.add({
        severity: "error",
        summary: "Error Message",
        detail: err.message || "Internal server error"
      });
    }
  }
}
