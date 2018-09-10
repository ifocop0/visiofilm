import { Component, OnInit } from '@angular/core';

import { CatalogService } from '../catalog.service';
import { Product } from '../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[];
  newProducts: Product[];
  bestSellingProducts: Product[];

  constructor(
    private catalogService: CatalogService,
  ) { }

  ngOnInit() {
    this.catalogService.getProducts().subscribe((products: Product[]) => { // IMPORTANT: Use arrow function here.
      this.products = products;
      const sampleSize = 4;
      this.newProducts = this.products.sort(() => .5 - Math.random()).slice(0, sampleSize);
      this.bestSellingProducts = this.products.sort(() => .5 - Math.random()).slice(0, sampleSize);
    });
  }

}
