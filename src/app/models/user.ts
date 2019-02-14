import { Recipe } from "@app/models/recipe";

export interface User {
  id: string;
  username: string;
  created: Date;
  token?: string;
  bookmarks?: Recipe[];
  recipes?: Recipe[];
}
