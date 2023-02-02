import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "./core/services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit{
  title = 'backoffice';
  role: string = "null"

  constructor(private loginService: LoginService) {
  }

  ngOnDestroy(): void {
    this.loginService.logout()
  }

  ngOnInit(): void {
    this.loginService.getUser().subscribe({
      next: (data) => {
        this.role = data?.roles
      }

    })
  }

  logout() {
    this.loginService.logout()
  }
}
