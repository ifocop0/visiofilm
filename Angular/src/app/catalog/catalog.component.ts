import { Component, OnInit } from '@angular/core';

import { CatalogService } from '../catalog.service';
import { Product } from '../interfaces';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Product[];

  constructor(
    private catalogService: CatalogService,
  ) { }

  ngOnInit() {
    this.catalogService.getProducts().subscribe((products: Product[]) => { // IMPORTANT: Use arrow function here.
      
      this.products = products;
      console.log(this.products);
    });
  }
}
