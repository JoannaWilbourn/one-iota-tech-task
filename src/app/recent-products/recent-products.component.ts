import { Component, OnInit } from '@angular/core';
import { RecentlyViewedService } from '../recently-viewed.service';

@Component({
  selector: 'app-recent-products',
  templateUrl: './recent-products.component.html',
  styleUrls: ['./recent-products.component.scss']
})
export class RecentProductsComponent implements OnInit {

  recentProducts = [];

  constructor(
    private recentViewService: RecentlyViewedService
  ) { }

  ngOnInit(): void {
    this.recentProducts = this.recentViewService.getRecentProducts();
  }

}
