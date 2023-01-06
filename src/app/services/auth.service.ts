import { Injectable } from '@angular/core';

import User from "../interfaces/user";
import {Auth, signOut, signInWithPopup, GoogleAuthProvider, user} from "@angular/fire/auth";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
  }

  async logout() {
    return await signOut(this.auth);
  }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  isLoggedIn(): boolean {
    return !!(this.auth.currentUser);
  }

  public getUserInfo(): User {
    return {
      uid: this.auth.currentUser?.uid,
      email: this.auth.currentUser?.email,
      photoURL: this.auth.currentUser?.photoURL,
      displayName: this.auth.currentUser?.displayName,
    }
  }
}
