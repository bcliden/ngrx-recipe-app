import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe, RecipeDTO } from "@app/models/recipe";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { validateWhitespace } from "@app/utility/validators";

@Component({
  selector: "app-recipe-editable",
  templateUrl: "./recipe-editable.component.html",
  styleUrls: ["./recipe-editable.component.scss"]
})
export class RecipeEditableComponent implements OnInit {
  @Input()
  recipe: Recipe;

  @Output()
  onSubmit: EventEmitter<RecipeDTO> = new EventEmitter<RecipeDTO>();

  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    this.buildForm();
  }

  buildForm() {
    this.recipeForm = this.fb.group({
      title: this.fb.control((this.recipe && this.recipe.title) || "", [
        Validators.required,
        validateWhitespace
      ]),
      description: this.fb.control(
        (this.recipe && this.recipe.description) || "",
        [Validators.required, validateWhitespace]
      )
    });
  }

  submit() {
    const submission: RecipeDTO = this.recipeForm.getRawValue();
    this.onSubmit.emit(submission);
  }
}
