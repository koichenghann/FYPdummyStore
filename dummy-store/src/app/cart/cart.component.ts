import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  loading = false
  configUrl = 'http://127.0.0.1:5000/cart/';
  currentUser = JSON.parse(localStorage.getItem('currentUser'))
  cart: any;
  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.http.get(this.configUrl + this.currentUser['_id']).subscribe(
      response => {
        this.cart = response
      }
    );
  }

}
