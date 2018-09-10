import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  //private apiBase = 'http://ng-ecommerce-api.virtuoworks.com/api';
   private apiBase = 'http://192.168.105.107:4000';

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    let urlP=this.apiBase+'/films';
    console.log("URL TOTAL : "+ urlP)
    console.log( this.http.get<Product[]>(`${this.apiBase}/films`) );
  
    return this.http.get<Product[]>(`${this.apiBase}/films`);

  }

  getProductById(id: string): Observable<Product> {
    const url = `${this.apiBase}/films/${id}`;

  
    console.log( 'ICI LE PRODUIT ' +this.http.get<Product>(url))

    
    return this.http.get<Product>(url);
  }

  /*
  Ordre décroissant
  http://ng-ecommerce-api.virtuoworks.com/api/Products?filter={"order":"name DESC"}

  {"where":{"id":"5b3a54b9be56c0d8c3495c75"}, "limit":1, "order":"name ASC"}

  {"where":{"id":{"neq":"5b3a54b9be56c0d8c3495c76"}}, "limit":3, "order":"name ASC"}
  */

  getRelatedProducts(id: string, max = 3): Observable<Product[]> {
    const url = `${this.apiBase}/Products/?filter={"where":{"id":{"neq":"${id}"}}, "limit":${max}, "order":"name DESC"}`;
    return this.http.get<Product[]>(url);
  }

}
