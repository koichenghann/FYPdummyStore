import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  configUrl = 'http://127.0.0.1:5000/';
  fetchedProducts;
  currentUser;

  private recommendations_retrieved_listener = new Subject<any>();
  private products_retrieved_listener = new Subject<any>();

  constructor(public http: HttpClient, private router: Router) { }

  get_recommendations_retrieved_listener() {
    return this.recommendations_retrieved_listener.asObservable();
  }
  get_products_retrieved_listener() {
    return this.products_retrieved_listener.asObservable();
  }


  getRecommendations() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get(this.configUrl + 'predictions/' + this.currentUser['_id']).subscribe(
      response => {
        // alert(JSON.stringify(response))
        this.recommendations_retrieved_listener.next(response)
        this.fetchedProducts = response
      }
    );
  }

  getProducts() {
    this.http.get(this.configUrl + '/products/').subscribe(
      response => {
        this.products_retrieved_listener.next(response)
        this.fetchedProducts = response
      }
    );
  }

  rateProduct(product, rating) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.post(this.configUrl + '/rate', {product: product, user: this.currentUser._id, rating: rating }).subscribe(
      response => {
        // alert(JSON.stringify(response));
        // this.products_retrieved_listener.next(response)
        // this.fetchedProducts = response
      }
    );
  }


}
