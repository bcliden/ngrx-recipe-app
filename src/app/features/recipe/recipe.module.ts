import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { UIModule } from "@app/ui.module";
import { UUIDGuard } from "@app/services/uuid.guard";
import { AuthService } from "@app/services/auth.service";

import { RecipeEffects } from "./state/recipe.effects";
import { recipeReducer } from "./state/recipe.reducer";
import { RecipeResolver } from "./recipe.resolver";
import { RecipesComponent } from "./recipes/recipes.component";
import { SelectedRecipeComponent } from "./selected-recipe/selected-recipe.component";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { NewRecipeComponent } from "./new-recipe/new-recipe.component";

const routes: Routes = [
  { path: "new", component: NewRecipeComponent, canActivate: [AuthService] },
  {
    path: ":id",
    canActivate: [UUIDGuard],
    component: SelectedRecipeComponent,
    resolve: { data: RecipeResolver }
  },
  {
    path: ":id/edit",
    canActivate: [UUIDGuard, AuthService],
    component: EditRecipeComponent,
    resolve: { data: RecipeResolver }
  },
  { path: "", component: RecipesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UIModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature("recipes", recipeReducer),
    EffectsModule.forFeature([RecipeEffects])
  ],
  declarations: [
    RecipesComponent,
    SelectedRecipeComponent,
    EditRecipeComponent,
    NewRecipeComponent
  ],
  providers: [RecipeResolver]
})
export class RecipeModule {}
