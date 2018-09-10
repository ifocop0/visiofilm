import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from '../account/account.component';
import { AuthGuardService } from '../auth-guard.service';
import { CartComponent } from '../cart/cart.component';
import { CatalogComponent } from '../catalog/catalog.component';
import { ConnectComponent } from '../connect/connect.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProductComponent } from '../product/product.component';
import { SignupComponent } from '../signup/signup.component';
import { TestsComponent } from '../tests/tests.component';
import { PaymentComponent } from '../payment/payment.component';
import { RealisateursComponent } from '../realisateurs/realisateurs.component';
// import { CartComponent } from './cart/cart.component';

// Routes
const routes: Routes = [
//  { path: '', redirectTo: '/home', pathMatch: 'full' }, // ressource : /
  { path: '', component: HomeComponent }, // ressource : /
  { path: 'films', component: CatalogComponent }, // ressource : /
  { path: 'products', component: CatalogComponent }, // ressource : /
  { path: 'Films', component: CatalogComponent }, // ressource : /
  { path: 'catalog', component: CatalogComponent }, // ressource : /catalog
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] }, // ressource : /account
  { path: 'connect', component: ConnectComponent }, // ressource : /connect
  { path: 'cart', component: CartComponent }, // ressource : /cart
  { path: 'login', component: LoginComponent }, // ressource : /login
  { path: 'payment', component: PaymentComponent }, // ressource : /login
  { path: 'product/:id', component: ProductComponent }, // ressource : /product/1 ou /product/2 ...
  { path: 'films/:id', component: ProductComponent }, // ressource : 
  { path: 'signup', component: SignupComponent }, // ressource : /signup
  { path: 'realisteurs', component: RealisateursComponent }, // ressource : /tests
  { path: '**', component: NotFoundComponent }, // Toujours en dernier !
];

/**
 * NOTE :
 * Ne pas déclarer les composants ("declarations") dans le module ci-dessous.
 * Les composants de pages sont déjà déclarés dans app.module.ts (notre module principal).
 */
@NgModule({
  imports: [
    // CommonModule
    [RouterModule.forRoot(routes)] // La méthode ".forRoot()" rend les routes accessibles pour toute l'application.
  ],
  exports: [ RouterModule ], // Ce module sera importé par le module principal de notre application : app.module.ts.
  // declarations: [], // Rien à déclarer ici.
})
export class AppRoutingModule { }
