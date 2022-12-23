import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { YouComponent } from './pages/you/you.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { InfoCardComponent } from './components/info-card/info-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    YouComponent,
    SettingsComponent,
    ExerciseListComponent,
    InfoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
