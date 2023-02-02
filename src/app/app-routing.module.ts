import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {StatsComponent} from "./component/stats/stats.component";
import {TicketComponent} from "./component/ticket/ticket.component";
import {StoreCreationComponent} from "./component/store-creation/store-creation.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'ticket', component: TicketComponent },
  { path: 'creation/:id', component: StoreCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
