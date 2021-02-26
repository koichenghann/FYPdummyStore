import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  currentUser;
  user_retrieved_listener: Subscription;

  constructor(public http: HttpClient,  private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != undefined) {
      this.username = this.currentUser.username;
      this.password = this.currentUser.password;
    }
    
    this.user_retrieved_listener = this.authService.get_user_retrieved_listener().subscribe( response => {
      this.username = '';
      this.password = '';
    })
  }

  ngOnDestroy() {
    this.user_retrieved_listener.unsubscribe();
  }

  submit_handler(){
    this.authService.login(this.username, this.password);
  }

}
