export enum Roles {
  USER= "USER",
  ADMIN = "ADMIN",
  HANDLER = "HANDLER",
  WORKER = "WORKER",
  OWNER = "OWNER"
}

export enum InvoiceRate {
  weekly= "weekly",
  monthly = "monthly",
  yearly = "yearly"
}

export enum ProblemType {
  business = "Business",
  technical = "Technical",
  other = "Other"
}

export enum SenderType {
  store = "Store",
  customer = "Customer"
}

export enum State {
  closed = "Closed",
  ongoing = "Ongoing",
  waiting =  "Waiting"
}
