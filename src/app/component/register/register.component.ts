import {Component} from '@angular/core';
import {Roles} from "../../core/constant/enums";
import {LoginService} from "../../core/services/login.service";
import {FormControl, FormGroup} from "@angular/forms";

export interface RegisterOwnerRequest {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  role: Roles,

  siret : string,
  storeName : string,
  sector : string,
}

export interface RegisterBasicUserRequest {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  role: Roles,
  storeId: number
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formError: boolean = false;
  creationSuccessfull: boolean = false

  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmation: new FormControl(''),
    phoneNumber: new FormControl(''),
    siret : new FormControl(''),
    storeName : new FormControl(''),
    sector : new FormControl(''),
  })

  constructor(private loginService: LoginService) {
  }

  createAnAccount() {

    if (this.form.value.password != this.form.value.confirmation) {
      this.formError = true
      return
    }
    let request: RegisterOwnerRequest = {
      email: this.form.value.email || '',
      firstName: this.form.value.firstName || '',
      lastName: this.form.value.lastName || '',
      password: this.form.value.password || '',
      phoneNumber: this.form.value.phoneNumber || '',
      role: Roles.OWNER,
      sector: this.form.value.sector || '',
      siret: this.form.value.siret || '',
      storeName: this.form.value.storeName || '',
    }
    this.loginService.registerOwnerUser(request).subscribe({
      next: (data) => {
        console.log(data)
        this.creationSuccessfull = true;
      },
      error: err => {
        console.log(err.message)
      }
    })
  }

}
