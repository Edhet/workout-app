import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { YouComponent } from './pages/you/you.component';
import { SettingsComponent } from "./pages/settings/settings.component";
import { LoginGuard } from "./services/login.guard";


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  {path: 'you', component: YouComponent, canActivate: [LoginGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
