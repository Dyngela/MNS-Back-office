import { Component } from '@angular/core';
import {LoginService} from "../../../core/services/login.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formError: boolean = false

  constructor(private loginService: LoginService, private router: Router) {
  }

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  login() {
    this.formError = false
    if (this.form.valid && this.form.value.email != null && this.form.value.password != null) {
      this.loginService.login({email: this.form.value.email, password: this.form.value.password}).subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigate([
            `home`,
          ]);
        },
        error: err => {
          console.log(err.message)
          this.formError = true
        }
      })
    }
  }
}
