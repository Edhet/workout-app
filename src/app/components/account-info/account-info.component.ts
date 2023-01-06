import {Component} from '@angular/core';

import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import User from "../../interfaces/user";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent{
  userInfo: User = {uid: null, email: null, displayName: null, photoURL: null};

  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(user => {
      this.userInfo = this.auth.getUserInfo();
    });
  }

  async logoutBtn() {
    await this.auth.logout().then(() => {this.router.navigate(["login"])});
  }
}
