import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-icon',
  templateUrl: './shopping-cart-icon.component.html',
  styleUrls: ['./shopping-cart-icon.component.scss']
})
export class ShoppingCartIconComponent implements OnInit {

  cartTotal = 0;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.shoppingCartService.productAdded.subscribe(
      items => this.cartTotal = +items);
   }

  getCartTotal() {
    this.shoppingCartService.getCartTotal();
  }

}
