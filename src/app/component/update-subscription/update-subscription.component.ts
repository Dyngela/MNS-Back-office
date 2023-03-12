import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {SubscriptionService} from "../../core/services/subscription.service";
import {Subscription, SubscriptionType} from "../home/home.component";
import {InvoiceRate} from "../../core/constant/enums";

@Component({
  selector: 'app-update-subscription',
  templateUrl: './update-subscription.component.html',
  styleUrls: ['./update-subscription.component.scss']
})
export class UpdateSubscriptionComponent implements OnInit{
  constructor(private router: Router,
              private userService: UserService,
              private subService: SubscriptionService) {
  }

  currentSub: Subscription = {
    dateEnd: null,
    dateStart: null,
    paymentType: null,
    storeId: null,
    subscriptionId: null,
    subscriptionType: null
  }
  subscriptions: SubscriptionType[] = []
  invoiceRate: InvoiceRate = InvoiceRate.yearly
  hasLoaded: boolean = false
  dateStart: string | undefined = ""
  dateEnd: string | undefined = ""

  ngOnInit() {
    this.subService.getStoreSubscription(this.userService.user.storeId).subscribe({
      next: value => {
        this.currentSub = value
        this.dateStart = this.currentSub.dateStart as unknown as string
        this.dateEnd = this.currentSub.dateEnd as unknown as string
        this.dateStart = this.dateStart.split("T")[0]
        this.dateEnd = this.dateEnd.split("T")[0]
      }
    })
    this.subService.getSubscriptions().subscribe({
      next: value => {
        this.subscriptions = value;
      }
    })
    this.hasLoaded = true
  }

  updateSub(type: SubscriptionType) {
    let subscript: Subscription = {
      dateEnd: null,
      dateStart: null,
      paymentType: this.invoiceRate,
      storeId: this.userService.user.storeId,
      subscriptionId: this.currentSub.subscriptionId,
      subscriptionType: type
    }
    this.subService.update(subscript).subscribe({
      next: value => {
        console.log("sub updated")
      },
      error: err => {
        alert("subscription updated")
        this.router.navigate(['home'])
      }
    })
  }

  cancelSub() {
    let subscript: Subscription = {
      dateEnd: new Date(),
      dateStart: null,
      paymentType: null,
      storeId: this.userService.user.storeId,
      subscriptionId: this.currentSub.subscriptionId,
      subscriptionType: null
    }
    this.subService.update(subscript).subscribe({
      next: value => {
        alert("Your subscription has been canceled")
        this.router.navigate([`home`])
      },
      error: err => {
        alert("A problem have been encountered while canceling your subscription.")
      }
    })

  }
}
