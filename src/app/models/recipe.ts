import { User } from "@app/models/user";
import { Comment } from "@app/models/comment";

export interface Recipe {
  id: string;
  created: Date;
  updated: Date;
  title: string;
  description: string;
  author: User;
  upvotes?: number;
  downvotes?: number;
  comments?: [Comment];
}

export interface RecipeDTO {
  title: string;
  description: string;
}
