import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";
import { AuthType, AuthDTO } from "@app/models/auth";
import { Observable } from "rxjs";
import { User } from "@app/models/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private api: string = environment.api_server + "/auth";

  private auth(authType: AuthType, data: AuthDTO): Observable<User> {
    return this.http.post<User>(`${this.api}/${authType}`, data);
  }

  whoami(): Observable<User> {
    return this.http.get<User>(`${this.api}/whoami`, {
      headers: { authorization: `Bearer ${this.token}` }
    });
  }

  login(data: AuthDTO): Observable<User> {
    return this.auth("login", data);
  }

  register(data: AuthDTO): Observable<User> {
    return this.auth("register", data);
  }

  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem("recipe_token");
  }

  set token(value: string) {
    if (value) {
      localStorage.setItem("recipe_token", value);
    } else {
      localStorage.clear();
    }
  }
}
