import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "@app/app-routing.module";
import { AppComponent } from "@app/app.component";
import { AuthService } from "@app/services/auth.service";
import { ApiService } from "@app/services/api.service";
import { AppStoreModule } from "./store/app-store.module";
import { AuthComponent } from "./components/auth/auth.component";
import { UIModule } from "./ui.module";
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, NavbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppStoreModule,
    UIModule
  ],
  providers: [AuthService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
