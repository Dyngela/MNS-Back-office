import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {SubscriptionType} from "../../component/home/home.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private api: ApiService) { }

  getSubscriptions(): Observable<SubscriptionType[]>{
    return this.api.get("subscription/api/v1/subscriptionsType")
  }
}
