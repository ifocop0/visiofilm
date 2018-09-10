import { Injectable } from '@angular/core';

import { Cart, CartItem, Product } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart;
  cartItemsArray: CartItem[] = []; // tableau d'objets de type CartItem.

  constructor() {
    const lsCart = localStorage.getItem('cart');
    if (lsCart) {
      this.cart = JSON.parse(lsCart);
    } else {
      this.cart = {
        lines: {}, // On initialise le panier avec un objet vide pour les lignes articles.
        total: 0,
        shippingCost: 0,
        nbItems: 0,
      };
      this.updateLocalStorage();
    }
    this.updateCartItemsArray();
    // console.log('CartService - constructor(), this.cart:', this.cart);
  }

  updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addProduct(product: Product): void {
    // console.log('CartService addProduct()');
    if (product.id in this.cart.lines) {
      this.cart.lines[product.id].qty++;
      // this.cart.lines[product.id].itemTotal = this.cart.lines[product.id].qty * product.price;
    } else {
      this.cart.lines[product.id] = {
        qty: 1,
        product: product,
        itemTotal: product.prix,
      };
    }
    this.calculateCart();
  }

  addOne(productId: string): void {
    if (productId in this.cart.lines) {
      this.cart.lines[productId].qty++;
    }
    this.calculateCart();
  }

  removeOne(productId: string): void {
    if (productId in this.cart.lines) {
      if (this.cart.lines[productId].qty > 1) {
        this.cart.lines[productId].qty--;
      } else {
        this.removeProduct(productId);
      }
    }
    this.calculateCart();
  }

  removeProduct(productId: string): void {
    if (productId in this.cart.lines) {
      // console.log('Le produit à supprimer a été trouvé', this.cart);
      delete this.cart.lines[productId];
      // console.log(this.cart);
      this.calculateCart();
    }
  }

  getProductQty(productId: string): number {
    if (productId in this.cart.lines) {
      return this.cart.lines[productId].qty;
    } else {
      return 0;
    }
  }

  calculateCart(): void {
    this.cart.total = 0;
    this.cart.nbItems = 0;
    for (const prop in this.cart.lines) {
      if (this.cart.lines.hasOwnProperty(prop)) {
        this.cart.lines[prop].itemTotal = this.cart.lines[prop].qty * this.cart.lines[prop].product.prix;
        this.cart.total += this.cart.lines[prop].itemTotal;
        this.cart.nbItems += this.cart.lines[prop].qty;
      }
    }
    this.updateCartItemsArray();
    this.updateLocalStorage();
  }

  updateCartItemsArray(): CartItem[] {
    // console.log('updateCartItemsArray() - this.cart:', this.cart);
    this.cartItemsArray = [];
    for (const prop in this.cart.lines) {
      if (this.cart.lines.hasOwnProperty(prop)) {
        this.cartItemsArray.push(this.cart.lines[prop]);
      }
    }
    return this.cartItemsArray;
  }

}
