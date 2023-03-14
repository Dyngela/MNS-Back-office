import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/logger/login/login.component";
import {RegisterComponent} from "./component/logger/register/register.component";
import {StatsComponent} from "./component/stats/stats.component";
import {StoreCreationComponent} from "./component/store-creation/store-creation.component";
import {PersonalManagementComponent} from "./component/personal-management/personal-management.component";
import {PersonalisationComponent} from "./component/customisation/personalisation/personalisation.component";
import {CreateThemeComponent} from "./component/customisation/theme/create-theme/create-theme.component";
import {UpdateSubscriptionComponent} from "./component/update-subscription/update-subscription.component";
import {TicketComponent} from "./component/ticket/ticket/ticket.component";
import {CreateTicketComponent} from "./component/ticket/create-ticket/create-ticket.component";
import {ListTicketComponent} from "./component/ticket/list-ticket/list-ticket.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'management', component: PersonalManagementComponent },
  { path: 'personalisation', component: PersonalisationComponent },
  { path: 'create-theme', component: CreateThemeComponent },
  { path: 'creation/:id', component: StoreCreationComponent },
  { path: 'update-subscription', component: UpdateSubscriptionComponent },

  { path: "ticket/:id", component: TicketComponent},
  { path: "ticket/create", component: CreateTicketComponent},
  { path: "tickets", component: ListTicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
