import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr);

import { AppRoutingModule } from './app-routing/app-routing.module';


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { TestsComponent } from './tests/tests.component';
import { CatalogComponent } from './catalog/catalog.component';
import { PriceComponent } from './price/price.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductComponent } from './product/product.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ConnectComponent } from './connect/connect.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { RealisateursComponent } from './realisateurs/realisateurs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestsComponent,
    CatalogComponent,
    PriceComponent,
    HomeComponent,
    NotFoundComponent,
    ProductComponent,
    SignupComponent,
    LoginComponent,
    ConnectComponent,
    AccountComponent,
    CartComponent,
    PaymentComponent,
    ProductThumbnailComponent,
    RealisateursComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
