import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../interfaces';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.css']
})
export class ProductThumbnailComponent implements OnInit {
  @Input() product: Product;
  constructor() {
    console.log(this.product);
   }

  ngOnInit() {
  }

}
