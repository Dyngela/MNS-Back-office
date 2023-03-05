import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Address, Store} from "../../component/store-creation/store-creation.component";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private api: ApiService) { }

  findById(id: number): Observable<Store> {
    return this.api.get(`api/v1/store/${id}`)
  }

  getAll(): Observable<Store[]> {
    return this.api.get(`api/v1/store/all`)
  }

  create(store: Store): Observable<Store> {
    return this.api.put("api/v1/store/save", store)
  }

  update(store: Store): Observable<Store> {
    return this.api.post("api/v1/store/save", store)
  }

  createAddress(address: Address, storeid: number): Observable<Address> {
    return this.api.put(`api/v1/store/address/save/${storeid}`, address)
  }
}
