import {Injectable} from '@angular/core';
import {Auth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User} from "@angular/fire/auth";
import {BehaviorSubject, filter, firstValueFrom, lastValueFrom, map, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);

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
    const userObservable = this.getUserObservable();    
    return Boolean(await firstValueFrom(userObservable));
  }

  public getCurrentUser() {
    return this.auth.currentUser;
  }
}
