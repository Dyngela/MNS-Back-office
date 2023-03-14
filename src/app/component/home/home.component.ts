import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from "../../core/services/subscription.service";
import {NavigationExtras, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {LoginService} from "../../core/services/login.service";
import {Subscription, SubscriptionType} from "../../core/model/subscription";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subType: SubscriptionType[] = []
  dataLoaded: boolean = false;
  hasSubbed: boolean = false;
  currentSub: Subscription = {
    dateEnd: null,
    dateStart: null,
    paymentType: null,
    storeId: null,
    subscriptionId: null,
    subscriptionType: null
  }
  dateStart: string | undefined = ""
  dateEnd: string | undefined = ""
  storeId = 0

  constructor(private sub: SubscriptionService,
              private userService: UserService,
              private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginService.getUser().subscribe({
      next: value => {
        this.storeId = value?.storeId
        this.sub.getStoreSubscription(this.storeId).subscribe({
          next: data => {
            console.log(data)
            this.currentSub = data
            this.hasSubbed = true

            this.dateStart = this.currentSub.dateStart as unknown as string
            this.dateEnd = this.currentSub.dateEnd as unknown as string
            this.dateStart = this.dateStart.split("T")[0]
            this.dateEnd = this.dateEnd.split("T")[0]
          },
          error: err => {
            this.hasSubbed = false
          }
        })
        this.sub.getSubscriptions().subscribe({
          next: value => {
            this.subType = value
            this.dataLoaded = true
          },
          error: err => {
            console.log(err)
          }
        })
      },
      error: err => {
        console.log("error getting role from jwt")
      }
    });

  }

  redirect(type: SubscriptionType) {
    this.router.navigate([
      `creation/${type.subscriptionTypeId}`,
    ])
  }

  changeSub() {
    this.router.navigate([
      `update-subscription`
    ])
  }
}
