import { Injectable } from '@angular/core';
import {AuthUser} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //todo be reset to default
  user: AuthUser = {email: "azee@gmail.com", exp: 8595998559, roles: "OWNER", storeId: 16}
  constructor() { }

  updateUserInfo(info: AuthUser) {
    this.user.email = info.email
    this.user.storeId = info.storeId
    this.user.roles = info.roles
  }
}
