import { Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { AuthService } from "@app/services/auth.service";
import { User } from "@app/models/user";
import { Recipe, RecipeDTO } from "@app/models/recipe";
import { Comment, CommentDTO } from "@app/models/comment";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private api: string = environment.api_server + "/api";

  constructor(private http: HttpClient, private authService: AuthService) { }

  // convert to HttpParams ?
  // would have to make an httpInterceptor for token header
  private request(
    method: string,
    endpoint: string,
    body?: any
  ): Observable<any> {
    const url = `${this.api}/${endpoint}`;
    return this.http.request(method, url, {
      body,
      headers: { authorization: `Bearer ${this.authService.token}` }
    });
  }

  getUsers(page?: string): Observable<User[]> {
    const endpoint = page ? `users?page=${page}` : `users`;
    return this.request("GET", endpoint);
  }

  getUser(username: string): Observable<User> {
    return this.request("GET", `users/${username}`);
  }

  getRecipes(page?: number): Observable<Recipe[]> {
    const endpoint = page ? `recipes?page=${page}` : `recipes`;
    return this.request("GET", endpoint);
  }

  getNewestRecipes(page?: number): Observable<Recipe[]> {
    const endpoint = page
      ? `recipes?newest=true&page=${page}`
      : `recipes?newest=true`;
    return this.request("GET", endpoint);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.request("GET", `recipes/${id}`);
  }

  createRecipe(data: RecipeDTO): Observable<Recipe> {
    return this.request("POST", "recipes/", data);
  }

  updateRecipe(id: string, data: Partial<RecipeDTO>): Observable<Recipe> {
    const endpoint = `recipes/${id}`;
    return this.request("PUT", endpoint, data);
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.request("DELETE", `recipes/${id}`);
  }

  upvoteRecipe(id: string): Observable<Recipe> {
    return this.request("POST", `recipes/${id}/upvote`);
  }

  downvoteRecipe(id: string): Observable<Recipe> {
    return this.request("POST", `recipes/${id}/downvote`);
  }

  bookmarkRecipe(id: string): Observable<User> {
    return this.request("POST", `recipes/${id}/bookmark`);
  }

  unbookmarkRecipe(id: string): Observable<User> {
    return this.request("POST", `recipes/${id}/unbookmark`);
  }

  getCommentsByRecipe(id: string, page?: number): Observable<Comment[]> {
    const endpoint = page
      ? `comments/recipe/${id}?page=${page}`
      : `comments/recipe/${id}`;
    return this.request("GET", endpoint);
  }

  getCommentsByUser(id: string, page?: number): Observable<Comment[]> {
    const endpoint = page
      ? `comments/user/${id}?page=${page}`
      : `comments/user/${id}`;
    return this.request("GET", endpoint);
  }

  createComment(recipeId: string, data: CommentDTO): Observable<Comment> {
    return this.request("POST", `comments/recipe/${recipeId}`, data);
  }

  updateComment(id: string, data: Partial<CommentDTO>): Observable<Comment> {
    return this.request("PUT", `comments/${id}`, data);
  }

  deleteComment(id: string): Observable<Comment> {
    return this.request("DELETE", `comments/${id}`);
  }
}
