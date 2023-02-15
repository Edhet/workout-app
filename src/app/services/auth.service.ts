import {Injectable} from '@angular/core';
import {Auth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User} from "@angular/fire/auth";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<User | null | boolean>(false);

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, user => this.user.next(user));
  }

  public getUserObservable() {
    return this.user.asObservable();
  }

  public async logout() {
    return await signOut(this.auth);
  }

  public async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  public async isLoggedIn(): Promise<boolean> {
    let t = 0;
    while (t <= 200) {
      if (typeof this.user.value != "boolean")
        return !!this.user.value;
      await new Promise(resolve => setTimeout(resolve, 10));
      t++;
    }
    return false;
  }

  public getCurrentUser() {
    return this.auth.currentUser;
  }
}
