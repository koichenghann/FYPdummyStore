import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  configUrl = 'http://127.0.0.1:5000/products/';
  fetchedRecipe: any;
  product: any = {_id: '', productName: ''};
  _id: string = '';
  products_retrieved_listener: Subscription;

  constructor(private route: ActivatedRoute, public http: HttpClient, private productsService: ProductsService) {
    this.route.params.subscribe( params => this._id = params._id);
  }

  ngOnInit(): void {
    this.products_retrieved_listener = this.productsService.get_products_retrieved_listener().subscribe(response => {
      this.fetchedRecipe = response
      this.product = this.fetchedRecipe.find(element => element._id == this._id);
      this.setRating(2);
    })
    this.productsService.getProducts();
  }

  ngOnDestroy() {
    this.products_retrieved_listener.unsubscribe();
  }

  //view page = 1
  //add to cart = 2
  //buy now = 4
  setRating(rating) {
    this.productsService.rateProduct(this.product._id, rating)
  }


}
