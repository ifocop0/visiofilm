import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../interfaces';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  customerInfo: Customer;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    if (this.customerService.isLoggedIn) {
      console.log('yes');
      this.customerInfo = this.customerService.customerInfo;
      console.log(this.customerInfo);
    } else {
      console.log('no');
    }
  }

  logout() {
    this.customerService.logout();
  }
}
