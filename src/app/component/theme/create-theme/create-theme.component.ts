import { Component } from '@angular/core';
import {CustomisationService} from "../../../core/services/customisation.service";
import {UserService} from "../../../core/services/user.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../core/services/login.service";
import {Customisation} from "../../../core/model/customisation";

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.scss']
})
export class CreateThemeComponent {
  theme: Customisation = {
    active: false,
    catchPhrase: "",
    colorBackground: "",
    colorButton: "",
    customisationId: null,
    font: "",
    storeId: 0
  }
  storeId = 0

  constructor(private customisationService: CustomisationService,
              private userService: UserService,
              private router: Router,
              private loginService: LoginService) {
  }


  createTheme() {
    this.loginService.getUser().subscribe({
      next: value => {
        this.theme.storeId = value?.storeId
        this.customisationService.create(this.theme).subscribe({
          next: (returnTheme) => {
            console.log(returnTheme)
            alert("Your theme has been saved properly.")
            this.router.navigate([`personalisation`])
          }
        })
      },
      error: err => {
        console.log("error getting role from jwt")
      }
    });

  }
}
