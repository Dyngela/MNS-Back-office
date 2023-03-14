import {Component, ViewChild} from '@angular/core';
import {UserService} from "../../../core/services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../core/model/user";
import {LoginService} from "../../../core/services/login.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-personal-management',
  templateUrl: './personal-management.component.html',
  styleUrls: ['./personal-management.component.scss']
})
export class PersonalManagementComponent {

  users: User[] = []
  loading = true;
  columnNames: string[] = [
    "email",
    "role"
  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<User>(this.users);

  constructor(private userService: UserService, private router: Router, private loginService: LoginService) {
    loginService.getUser().subscribe({
      next: value => {
        userService.getAllUserByStoreId(value?.storeId).subscribe({
          next: value => {
            this.users = value;
            this.loading = false;
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
          },
        })
      }
    })
  }

  handleClickUser(row: User) {
    this.router.navigate([``])
  }
}
