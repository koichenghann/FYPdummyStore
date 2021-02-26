import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username = '';
  password = '';
  user_created_listener: Subscription;

  constructor(public http: HttpClient,  private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // localStorage.removeItem('currentUser');
    this.user_created_listener = this.authService.get_user_created_listener().subscribe( response => {
      this.username = '';
      this.password = '';
    })
  }

  ngOnDestroy() {
    this.user_created_listener.unsubscribe();
  }

  submit_handler(){
    this.authService.signup(this.username, this.password);
  }

}
