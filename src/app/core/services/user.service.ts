import { Injectable } from '@angular/core';
import {AuthUser} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //todo be reset to default

  constructor() { }

  updateUserInfo(info: AuthUser) {

  }
}
