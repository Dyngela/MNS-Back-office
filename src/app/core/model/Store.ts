export interface Store {
  storeId: number
  siret: string
  storeName: string
  sector: string
  firstname: string
  lastname: string
  email: string
  ethAddress: string
  phoneNumber: string
  subscriptionId: number
}

export interface Address {
  addressId: number
  city: string
  postalCode: string
  complement: string
  streetNumber: string
  streetName: string
}
