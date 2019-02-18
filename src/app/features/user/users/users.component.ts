import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { User } from "@app/models/user";
import { AppState } from "../state";
import { LoadUsers } from "../state/user.actions";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadUsers());
    this.users = this.store.select(state => state.users.users);
  }
}
