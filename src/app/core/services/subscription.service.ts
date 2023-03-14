import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Subscription, SubscriptionType} from "../model/subscription";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private api: ApiService) { }

  getSubscriptions(): Observable<SubscriptionType[]>{
    return this.api.get("api/v1/subscription/subscriptionsType")
  }

  getStoreSubscription(storeId: number): Observable<Subscription> {
    return this.api.get(`api/v1/subscription/${storeId}`)
  }

  create(sub: Subscription): Observable<Subscription> {
    return this.api.put("api/v1/subscription/save", sub)
  }

  update(sub: Subscription): Observable<Subscription> {
    return this.api.post("api/v1/subscription/save", sub)
  }
}
