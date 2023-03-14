import {InvoiceRate} from "../constant/enums";

export interface SubscriptionType {
  subscriptionTypeId: number;
  name: string;
  turnover: number;
  support: string;
  price: number;
}


export interface Subscription {
  subscriptionId: number | null
  storeId: number | null
  dateStart: Date | null
  dateEnd: Date | null
  paymentType: InvoiceRate | null
  subscriptionType: SubscriptionType | null
}
