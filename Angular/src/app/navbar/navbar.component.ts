import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appName = 'virtuoBoutique';
  loggedInUser = false;
  isCollapsed = true;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event: NavigationStart) => {
      if (event instanceof NavigationStart) {
        this.isCollapsed = true;
      }
    });

    this.customerService.change.subscribe((loggedInStatus: boolean) => {
      this.loggedInUser = loggedInStatus;
    });
    this.loggedInUser = this.customerService.isLoggedIn;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

}
