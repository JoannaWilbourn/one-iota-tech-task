import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecentlyViewedService {

  recentProducts = [];

  constructor() { }

  addRecentProduct(product) {
    if (this.recentProducts.filter(recentProduct => recentProduct.id === product.id).length === 0) {
      this.recentProducts.push(product);
    }
    if(this.recentProducts.length > 6) {
      this.recentProducts.shift();
    }
  }

  getRecentProducts() {
    return this.recentProducts;
  }
}
