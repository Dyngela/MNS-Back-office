import {Component, OnDestroy} from '@angular/core';
import {LoginService} from "./core/services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'backoffice';

  constructor(private loginService: LoginService) {
  }

  ngOnDestroy(): void {
    this.loginService.logout()
  }

}
