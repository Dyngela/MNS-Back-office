import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {Roles} from "../constant/enums";
import {RegisterBasicUserRequest} from "../model/registration";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  getAllUserByStoreId(id: number) : Observable<User[]> {
    return this.api.get(`api/v1/authentication/all/${id}`)
  }

  deleteUserById(id: number) : Observable<any> {
    return this.api.delete(`api/v1/authentication/${id}`)
  }

  updateUserRole(role: Roles, id: number) : Observable<any> {
    return this.api.post(`api/v1/authentication/save`, {role, id})
  }

  createHandler(user: RegisterBasicUserRequest) : Observable<any> {
    user.role = Roles.HANDLER
    return this.api.put(`api/v1/authentication/create/handler`)
  }

  createWorker(user: RegisterBasicUserRequest) : Observable<any> {
    user.role = Roles.WORKER
    return this.api.put(`api/v1/authentication/create/worker`)
  }

}
