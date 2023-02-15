import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import UserDisplayInfo from "../../interfaces/userDisplayInfo";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  userInfo: UserDisplayInfo = {uid: null, email: null, displayName: null, photoURL: null};

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    let currentUser = this.auth.getCurrentUser();
    this.userInfo.uid = currentUser!.uid;
    this.userInfo.email = currentUser!.email;
    this.userInfo.displayName = currentUser?.displayName;
    setTimeout(() => this.userInfo.photoURL = currentUser?.photoURL, 20);
  }

  async logoutBtn() {
    this.auth.logout().then(async () => await this.router.navigate(["login"]));
  }
}
