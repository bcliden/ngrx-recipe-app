import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/components/common/messageservice";
import { MenubarModule } from "primeng/menubar";
import { RecipeComponent } from "./components/recipe/recipe.component";

@NgModule({
  declarations: [RecipeComponent],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MenubarModule
  ],
  exports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MenubarModule,
    RecipeComponent
  ],
  providers: [MessageService]
})
export class UIModule {}
