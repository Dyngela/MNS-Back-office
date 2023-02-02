import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-store-creation',
  templateUrl: './store-creation.component.html',
  styleUrls: ['./store-creation.component.scss']
})
export class StoreCreationComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.subTypeId)
  }

  get subTypeId() {
    return this.route.snapshot.params['id'];
  }
}
