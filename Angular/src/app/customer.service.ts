import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Customer, LoginData, SignupData } from './interfaces';
import { Observable, of } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';

/**
 * ATTENTION : ne pas importer
 * import { EventEmitter } from 'events'; // EventEmitter de Node.js.
 * VS Code propose les 2 en autocomplétion.
 */
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiBase = 'http://ng-ecommerce-api.virtuoworks.com/api';
  public isLoggedIn = false;
  public customerInfo: Customer;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedStatus = localStorage.getItem('loggedIn');
    if (storedStatus && storedStatus === '1') {
      const customerInfo = localStorage.getItem('customerInfo');
      if (customerInfo) {
        this.customerInfo = JSON.parse(customerInfo);
      }
      this.updateAuthStatus(true);
    }
  }

  createAccount(signupData: SignupData): Observable<any> {
    return this.http.post(`${this.apiBase}/Customers`, signupData);
  }

  login(loginData: LoginData): Observable<any> {
    const str = `${this.apiBase}/Customers?filter={"where":{"email":"${loginData.email}","password":"${loginData.password}"}}`;
    return this.http.get(str).pipe(map((data: any[]): boolean => {
      console.log('this.http.get:', data);
      this.customerInfo = data[0];
      const status = (data && data.length === 1) ? true : false;
      this.updateAuthStatus(status);
      return this.isLoggedIn;
    }));
  }

  logout() {
    this.updateAuthStatus(false);
    this.router.navigate(['/']);
  }

  updateAuthStatus(newStatus: boolean): void {
    this.isLoggedIn = newStatus;
    if (newStatus) {
      localStorage.setItem('loggedIn', '1');
      localStorage.setItem('customerInfo', JSON.stringify(this.customerInfo));
    } else {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('customerInfo');
    }
    this.change.emit(this.isLoggedIn);
  }
}
