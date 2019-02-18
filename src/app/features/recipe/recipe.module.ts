import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecipesComponent } from "./recipes/recipes.component";
import { UIModule } from "@app/ui.module";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { recipeReducer } from "./state/recipe.reducer";
import { EffectsModule } from "@ngrx/effects";
import { RecipeEffects } from "./state/recipe.effects";
import { SelectedRecipeComponent } from "./selected-recipe/selected-recipe.component";
import { RecipeResolver } from "./recipe.resolver";
import { UUIDGuard } from "@app/services/uuid.guard";

const routes: Routes = [
  { path: "", component: RecipesComponent },
  {
    path: ":id",
    canActivate: [UUIDGuard],
    component: SelectedRecipeComponent,
    resolve: { data: RecipeResolver }
  }
];

@NgModule({
  declarations: [RecipesComponent, SelectedRecipeComponent],
  imports: [
    CommonModule,
    UIModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature("recipes", recipeReducer),
    EffectsModule.forFeature([RecipeEffects])
  ],
  providers: [RecipeResolver]
})
export class RecipeModule {}
