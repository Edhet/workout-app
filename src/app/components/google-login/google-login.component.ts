import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent {
  constructor(private auth: AuthService, private router: Router) { }

  async loginBtn() {
    if (await this.auth.isLoggedIn())
      await this.router.navigate(["home"]);
    else
      await this.auth.login().then(() => {this.router.navigate(["home"])});
  }
}
