import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartContents = [];
  totalCost = 0;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.cartContents = this.shoppingCartService.getCartContents();
    this.totalCost = this.shoppingCartService.getCartTotalValue();
  }

}
