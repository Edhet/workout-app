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
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { SelectionPromptComponent } from './components/selection-prompt/selection-prompt.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';

import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { GoogleLoginComponent } from './components/google-login/google-login.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCOwNyLOf0djhiSgQA-b6PJbgHisQfYG_s",
  authDomain: "workout-app-edhet.firebaseapp.com",
  projectId: "workout-app-edhet",
  storageBucket: "workout-app-edhet.appspot.com",
  messagingSenderId: "1076716434809",
  appId: "1:1076716434809:web:7ceb1ba405a610e45f2ba8",
  measurementId: "G-Q2G1LQH2HH"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    YouComponent,
    SettingsComponent,
    ExerciseListComponent,
    InfoCardComponent,
    ExerciseCardComponent,
    SelectionPromptComponent,
    FooterComponent,
    AccountInfoComponent,
    GoogleLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
