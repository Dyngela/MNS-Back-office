import {Roles} from "../constant/enums";

export interface RegisterOwnerRequest {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  role: Roles,

  siret : string,
  storeName : string,
  sector : string,
}

export interface RegisterBasicUserRequest {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  role: Roles,
  storeId: number
}
