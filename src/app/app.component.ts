import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "./core/services/login.service";
import {UserService} from "./core/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit{
  title = 'backoffice';
  role: string = "null"

  constructor(private loginService: LoginService,
              public userService: UserService,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.loginService.logout()
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.user = {email: "", exp: 0, roles: "", storeId: 0}
    this.loginService.logout()
    this.router.navigate([
      `home`,
    ])
  }
}
