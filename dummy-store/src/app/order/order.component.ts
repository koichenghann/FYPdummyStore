import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  loading = false
  configUrl = 'http://127.0.0.1:5000/order/';
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
