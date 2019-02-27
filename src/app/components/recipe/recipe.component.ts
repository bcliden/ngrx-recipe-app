import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Recipe } from "@app/models/recipe";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"]
})
export class RecipeComponent implements OnInit {
  @Input()
  recipe: Recipe;
  @Input()
  displayOptions: boolean = false;

  @Output()
  onDelete: EventEmitter<void> = new EventEmitter();
  @Output()
  onUpvote: EventEmitter<void> = new EventEmitter();
  @Output()
  onDownvote: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() { }
}
