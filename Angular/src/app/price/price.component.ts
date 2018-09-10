import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  @Input() price: string; // 'price' est une propriété de cette classe, dont
  // la valeur provient d'une propriété liée sur l'élément 'app-price'
  // ex : <app-price [price]="product.price"></app-price>

  // Avec un alias:
  // @Input('price') priceNumber: string; // 'price' serait le nom de propriété (attribut) sur l'élément
  // et 'priceNumber' serait le nom de la propriété de cette classe.

  constructor() { }

  ngOnInit() {
  }

}
