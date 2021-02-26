import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  configUrl = 'http://127.0.0.1:5000/products/';
  fetchedRecipe: any;
  products_retrieved_listener: Subscription;
  loading = true;

  constructor(public http: HttpClient, private router: Router, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.products_retrieved_listener = this.productsService.get_products_retrieved_listener().subscribe(response => {
      this.fetchedRecipe = response
      this.loading = false;
    })
    this.loading = true;
    this.productsService.getProducts();
  }

  ngOnDestroy() {
    this.products_retrieved_listener.unsubscribe();
  }

  click_handler(_id) {
    this.router.navigate(['products/product', {_id: _id}]);
  }

}
