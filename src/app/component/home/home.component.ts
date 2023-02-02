import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from "../../core/services/subscription.service";
import {NavigationExtras, Router} from "@angular/router";
import {state} from "@angular/animations";

export interface SubscriptionType {
  subscriptionTypeId: number;
  name: string;
  turnover: number;
  support: string;
  price: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subType: SubscriptionType[] = []
  dataLoaded: boolean = false;

  constructor(private sub: SubscriptionService, private router: Router) {
  }

  ngOnInit(): void {
    this.sub.getSubscriptions().subscribe({
      next: value => {
        this.subType = value
        this.dataLoaded = true
      },
      error: err => {
        console.log(err)
      }
    })
  }

  redirect(type: SubscriptionType) {
    this.router.navigate([
      `creation/${type.subscriptionTypeId}`,
    ]);
  }
}
