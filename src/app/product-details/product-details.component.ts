import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { RecentlyViewedService } from '../recently-viewed.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: Object;
  selectedSize: number;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private recentViewService: RecentlyViewedService,
    private shoppingCartService: ShoppingCartService,
    private _itemAddedSnackBar: MatSnackBar,
    private router: Router,
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getProduct(id);    
  }

  getProduct(id: number): void {
    this.productsService.getProduct(id)
      .subscribe(product => {
        this.product = product;
        this.selectedSize = product['sizes'][0];
        this.recentViewService.addRecentProduct(this.product);
      });
  }

  addToBasket() {
    this.shoppingCartService.addProductToBasket(this.product, this.selectedSize);
    this._itemAddedSnackBar.open(this.product['name'] + ', size: ' + this.selectedSize + ' added to basket', '', { duration: 3000});
  }

  goBack(): void {
    this.router.navigateByUrl('/home');
  }

}
