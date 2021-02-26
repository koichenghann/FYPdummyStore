import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  currentUser;
  configUrl = 'http://127.0.0.1:5000/predictions/';
  fetchedRecipe: any;
  recommendations_retrieved_listener: Subscription;

  constructor(public http: HttpClient, private router: Router, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.recommendations_retrieved_listener = this.productsService.get_recommendations_retrieved_listener().subscribe(response => {
      this.fetchedRecipe = response
    })
    this.productsService.getRecommendations();
  }

  ngOnDestroy() {
    this.recommendations_retrieved_listener.unsubscribe();
  }

  click_handler(_id) {
    this.router.navigate(['products/product', {_id: _id}]);
  }

}
