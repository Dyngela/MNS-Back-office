import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/logger/login/login.component';
import { RegisterComponent } from './component/logger/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { StatsComponent } from './component/stats/stats.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { StoreCreationComponent } from './component/store-creation/store-creation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PersonalManagementComponent } from './component/personal-management/personal-management.component';
import { PersonalisationComponent } from './component/customisation/personalisation/personalisation.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CreateThemeComponent } from './component/customisation/theme/create-theme/create-theme.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdateSubscriptionComponent } from './component/update-subscription/update-subscription.component';
import {TokenInterceptor} from "./core/interceptor/TokenInterceptor";
import {ApiService} from "./core/services/api.service";
import {MatSelectModule} from '@angular/material/select';
import { CreateTicketComponent } from './component/ticket/create-ticket/create-ticket.component';
import { ListTicketComponent } from './component/ticket/list-ticket/list-ticket.component';
import { TicketComponent } from './component/ticket/ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    StatsComponent,
    StoreCreationComponent,
    PersonalManagementComponent,
    PersonalisationComponent,
    CreateThemeComponent,
    UpdateSubscriptionComponent,
    CreateTicketComponent,
    ListTicketComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
