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
    await this.auth.login().then(() => {this.router.navigate(["home"])});
  }
}
