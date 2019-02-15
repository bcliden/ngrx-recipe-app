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

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "recipe-app";

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // this.store.dispatch(
    //   new LoginUser(<AuthDTO>{
    //     username: "username",
    //     password: "password"
    //   })
    // );
    this.store.dispatch(new SetInitialUser());
  }
}
