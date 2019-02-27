import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/components/common/messageservice";
import { MenubarModule } from "primeng/menubar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { RecipeComponent } from "./components/recipe/recipe.component";
import { RecipeEditableComponent } from "./components/recipe-editable/recipe-editable.component";

@NgModule({
  declarations: [RecipeComponent, RecipeEditableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MenubarModule,
    ProgressSpinnerModule
  ],
  exports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MenubarModule,
    RecipeComponent,
    ProgressSpinnerModule,
    RecipeEditableComponent
  ],
  providers: [MessageService]
})
export class UIModule {}
