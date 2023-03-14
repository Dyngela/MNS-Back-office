import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Customisation} from "../model/customisation";

@Injectable({
  providedIn: 'root'
})
export class CustomisationService {

  constructor(private api: ApiService) { }

  getAll(storeId: number): Observable<Customisation[]> {
    return this.api.get(`api/v1/customisation/all/${storeId}`)
  }

  create(theme: Customisation): Observable<Customisation> {
    return this.api.put('api/v1/customisation/save', theme)
  }

  update(theme: Customisation): Observable<Customisation> {
    return this.api.post('api/v1/customisation/save', theme)
  }

  delete(theme: Customisation): Observable<String> {
    return this.api.delete(`api/v1/customisation/${theme.customisationId}`)
  }
}
