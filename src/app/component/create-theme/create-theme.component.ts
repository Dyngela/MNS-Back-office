import { Component } from '@angular/core';
import {Customisation} from "../personalisation/personalisation.component";
import {CustomisationService} from "../../core/services/customisation.service";
import {UserService} from "../../core/services/user.service";
import {Router} from "@angular/router";

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

  constructor(private customisationService: CustomisationService,
              private userService: UserService,
              private router: Router) {
  }


  createTheme() {
    this.theme.storeId = this.userService.user.storeId
    this.customisationService.create(this.theme).subscribe({
      next: (returnTheme) => {
        console.log(returnTheme)
        alert("Your theme has been saved properly.")
        this.router.navigate([`personalisation`])
      }
    })
  }
}
