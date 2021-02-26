import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  configUrl = 'http://127.0.0.1:5000/';
  // fetchedProducts;
  currentUser;

  private user_created_listener = new Subject<any>();
  private user_retrieved_listener = new Subject<any>();

  constructor(public http: HttpClient, private router: Router) { }

  get_user_created_listener() {
    return this.user_created_listener.asObservable();
  }
  get_user_retrieved_listener() {
    return this.user_retrieved_listener.asObservable();
  }

  signup(username, password) {
    this.http.post(this.configUrl + '/signup', {username:username, password: password}).subscribe(
      response => {
        if (response) {
          this.user_created_listener.next(response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.router.navigate(['login']);
        }
        else {
          alert('username exist');
        }
      }
    );
  }

  login(username, password) {
    this.http.post(this.configUrl + '/login', {username:username, password: password}).subscribe(
      response => {
        // alert(JSON.stringify(response));
        if (response) {
          this.user_retrieved_listener.next(response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.router.navigate(['recommendations']);
        }
        else {
          alert('ivalid credential');
        }
      }
    );
  }
}
