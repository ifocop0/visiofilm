import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.customerService.isLoggedIn) {
      console.log('Allow entry:', this.customerService.isLoggedIn);
      return true;
    } else {
      console.log('Deny entry:', this.customerService.isLoggedIn);
      this.router.navigate(['/connect']);
      return false; // juste pour retourner une valeur, car l'accès aura déjà été empêché par la navigation.
    }
  }
}
