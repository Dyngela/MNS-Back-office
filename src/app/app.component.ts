import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "./core/services/login.service";
import {UserService} from "./core/services/user.service";
import {Router} from "@angular/router";
import {JwtService} from "./core/services/jwt.service";

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
              private router: Router,
              private jwt: JwtService) {
  }

  ngOnDestroy(): void {
    this.loginService.logout()
  }

  ngOnInit(): void {
    this.loginService.getUser().subscribe({
      next: value => {
        this.role = value?.roles
      },
      error: err => {
        console.log("error getting role from jwt")
      }
    });
  }

  logout() {
    this.loginService.logout()
    this.router.navigate([
      `home`,
    ])
  }
}
