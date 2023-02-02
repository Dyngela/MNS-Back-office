import {Component, OnInit} from '@angular/core';
import {CustomisationService} from "../../core/services/customisation.service";
import {UserService} from "../../core/services/user.service";
import {Router} from "@angular/router";

export interface Customisation {
  customisationId: number | null
  colorBackground: string
  colorButton: string
  font: string
  catchPhrase: string
  active: boolean
  storeId: number
}

@Component({
  selector: 'app-personalisation',
  templateUrl: './personalisation.component.html',
  styleUrls: ['./personalisation.component.scss']
})
export class PersonalisationComponent implements OnInit {

  myThemes: Customisation[] = []
  selectedTheme: Customisation = {
    active: false,
    catchPhrase: "",
    colorBackground: "",
    colorButton: "",
    customisationId: null,
    font: "",
    storeId: 0

  }
  hasLoaded: boolean = false
  hasBeenClicked = false

  constructor(private customisationService: CustomisationService,
              private userService: UserService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.loadThemes()
  }

  themeClicked(theme: Customisation) {
    console.log(theme.customisationId)
    this.hasBeenClicked = true
    this.selectedTheme = theme
  }

  createTheme() {
    this.router.navigate([`create-theme`])
  }

  loadThemes() {
    this.customisationService.getAll(this.userService.user.storeId).subscribe({
      next: (data) => {
        this.myThemes = data
        this.hasLoaded = true
        console.log(data)
      }
    })
  }

  updateTheme() {
    this.customisationService.update(this.selectedTheme).subscribe({
      next: value => {
        console.log("theme updated")
      }
    })

    this.hasBeenClicked = false
    this.hasLoaded = false
    this.loadThemes()
  }

  cancelUpdate() {
    this.hasBeenClicked = false
  }

  deleteTheme() {
    this.customisationService.delete(this.selectedTheme).subscribe({
      next: value => {
        console.log("theme deleted")
      }
    })

    this.hasBeenClicked = false
    this.hasLoaded = false
    this.loadThemes()
  }
}
