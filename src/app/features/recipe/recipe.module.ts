import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecipesComponent } from "./recipes/recipes.component";
import { UIModule } from "@app/ui.module";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { recipeReducer } from "./state/recipe.reducer";
import { EffectsModule } from "@ngrx/effects";
import { RecipeEffects } from "./state/recipe.effect";

const routes: Routes = [{ path: "", component: RecipesComponent }];

@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule,
    UIModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature("recipes", recipeReducer),
    EffectsModule.forFeature([RecipeEffects])
  ]
})
export class RecipeModule {}
