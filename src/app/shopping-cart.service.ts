import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products = [];
  productAdded = new Subject<number>();

  constructor() { }

  addProductToBasket(product, size) {
    if (this.products.filter(item => item.id === product.id && item.selectedSize === size).length === 0) {
      this.products.push({ ...product, 'selectedSize' : size, 'amount' : 1});
    } else {
      this.products.find(item => item.id === product.id && item.selectedSize === size).amount++;
    }
    this.productAdded.next(+this.getCartTotal());
  }

  getCartContents() {
    return this.products;
  }

  getCartTotal() {
    return this.products.reduce((a,b) => a + (b['amount']), 0);
  }
  
  getCartTotalValue() {
    let total = this.products.reduce((a,b) => a + (b['amount'] * b['price']['amount']), 0);
    return total;
  }
}
