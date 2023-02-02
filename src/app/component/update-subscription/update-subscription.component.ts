import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {SubscriptionService} from "../../core/services/subscription.service";
import {Subscription} from "../home/home.component";

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

  ngOnInit() {
    this.subService.getStoreSubscription(this.userService.user.storeId).subscribe({
      next: value => {
        this.currentSub = value
      }
    })
  }

}
