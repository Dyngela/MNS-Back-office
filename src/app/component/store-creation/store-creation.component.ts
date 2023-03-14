import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubscriptionService} from "../../core/services/subscription.service";
import {StoreService} from "../../core/services/store.service";
import {LoginService} from "../../core/services/login.service";
import {UserService} from "../../core/services/user.service";
import {InvoiceRate} from "../../core/constant/enums";
import {EtherService} from "../../core/services/ether.service";
import {Address, Store} from "../../core/model/Store";
import {Subscription, SubscriptionType} from "../../core/model/subscription";



@Component({
  selector: 'app-store-creation',
  templateUrl: './store-creation.component.html',
  styleUrls: ['./store-creation.component.scss']
})
export class StoreCreationComponent implements OnInit {

  creationSuccess: boolean = false;
  invoiceRate: InvoiceRate = InvoiceRate.yearly

  store: Store = {
    ethAddress: "",
    email: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
    sector: "",
    siret: "",
    storeId: 0,
    storeName: "",
    subscriptionId: 0
  };

  address: Address = {
    addressId: 0, city: "", complement: "", postalCode: "", streetName: "", streetNumber: ""
  }
  subscriptionType: SubscriptionType[] = []
  hasLoaded: boolean = false
  paymentSuccess: boolean = false
  storeId = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private subService: SubscriptionService,
              private storeService: StoreService,
              private loginService: LoginService,
              public userService: UserService,
              private ctx: EtherService) {
  }

  ngOnInit(): void {
    this.loginService.getUser().subscribe({
      next: value => {
        this.storeId = value?.storeId
        if (this.storeId == 0) {
          alert("You need to be authenticated to continue")
          this.router.navigate([
            `home`,
          ]);
          return
        }

        this.subService.getSubscriptions().subscribe({
          next: (subs) => {
            this.subscriptionType = subs
          }
        })
        this.storeService.findById(this.storeId).subscribe({
          next: (data) => {
            this.store = data
            this.store.subscriptionId = this.subTypeId
            console.log(data)
          }
        })

        this.hasLoaded = true
      },
      error: err => {
        console.log("error getting role from jwt")
      }
    });
  }

  public get subTypeId() {
    return this.route.snapshot.params['id'];
  }

  createStore() {

    this.storeService.update(this.store).subscribe({
      next: (myStore) => {
        this.storeService.createAddress(this.address, this.storeId).subscribe({
          next: (data) => {
            console.log("success")
          }
        })
        this.creationSuccess = true
      },
      error: err => {
        console.log(err)
      }
    })
  }

  // TODO create his website
  goToHisWebsite() {

  }

  startSubscription() {
    let sub: Subscription = {
      dateEnd: null,
      dateStart: null,
      paymentType: this.invoiceRate,
      storeId: this.storeId,
      // @ts-ignore
      subscriptionType: {
        subscriptionTypeId: this.subTypeId,
      }
    }
    // Calculating roughly the current eth price
    const ethPrice = this.subscriptionType[this.subTypeId].price / 7;
    this.ctx.loadWeb3(ethPrice.toString()).then(
      response => {
        if (response) {
          this.subService.create(sub).subscribe({
            next: (date) => {
              console.log("yes")
              this.paymentSuccess = true
            },
            error: err => {
              this.paymentSuccess = true
              console.log(err)
            }
          })
        }
      }
    )
  }
}
