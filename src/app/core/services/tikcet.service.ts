import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {ProblemType, SenderType, State} from "../constant/enums";

export interface Ticket {
  ticketId: number
  title: string
  problemType: ProblemType
  description: string
  senderType: SenderType
  state: State
  storeId: number
  customerId: number
}

@Injectable({
  providedIn: 'root'
})
export class TikcetService {

  constructor(private api: ApiService) { }

  findByTicketId(id: number): Observable<Ticket> {
    return this.api.get(`api/v1/ticket/${id}`)
  }

  findAllCustomerTicketByStoreId(id: number): Observable<Ticket[]> {
    return this.api.get(`api/v1/ticket/customer/all/${id}`)
  }

  findAllStoreTicketByStoreId(id: number): Observable<Ticket[]> {
    return this.api.get(`api/v1/ticket/store/all/${id}`)
  }

  update(ticket: Ticket): Observable<Ticket> {
    return this.api.post("api/v1/ticket/save")
  }

  create(ticket: Ticket): Observable<Ticket> {
    return this.api.put("api/v1/ticket/save")
  }

}
