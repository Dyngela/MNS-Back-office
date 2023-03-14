import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {StatsComponent} from "./component/stats/stats.component";
import {TicketComponent} from "./component/ticket/ticket.component";
import {StoreCreationComponent} from "./component/store-creation/store-creation.component";
import {PersonalManagementComponent} from "./component/personal-management/personal-management.component";
import {PersonalisationComponent} from "./component/personalisation/personalisation.component";
import {CreateThemeComponent} from "./component/theme/create-theme/create-theme.component";
import {UpdateSubscriptionComponent} from "./component/update-subscription/update-subscription.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'ticket', component: TicketComponent },
  { path: 'management', component: PersonalManagementComponent },
  { path: 'personalisation', component: PersonalisationComponent },
  { path: 'create-theme', component: CreateThemeComponent },
  { path: 'creation/:id', component: StoreCreationComponent },
  { path: 'update-subscription', component: UpdateSubscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
