import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userLoggedIn = false;
  constructor(private router: Router) {
    router.events.subscribe( val => {
      this.route_changed_handler(val);
    })
  }

  ngOnInit(): void {

  }

  route_changed_handler(val){
    // console.log(val.url);
    if (val.url == '/login') {
      this.userLoggedIn = false;
    } else if (
      val.url == '/recommendations' ||
      val.url == '/products'
    ) {
      this.userLoggedIn = true;
    }
    // if (localStorage.getItem('currentUser') != null) {
    //   console.log('user logged in: ' + localStorage.getItem('currentUser'))
    //   this.userLoggedIn = true;
    // } else {
    //   console.log('user logged out')
    //   this.userLoggedIn = false;
    // }
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
