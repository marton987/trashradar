import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services';
import { Credentials } from '../services/auth/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public credentials: Credentials = {
    username: '',
    password: ''
  };
  public errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.credentials).subscribe(userData => {
      this.router.navigate(['home']);
    }, err => this.errorHandler(err));
  }

  private errorHandler(error) {
    switch (error.status) {
      case 404:
        this.errorMessage = 'Can\'t connect to the server.';
      break;
      case 401:
        this.errorMessage = 'Wrong username or password.';
      break;
      default:
        this.errorMessage = 'Unforseen error.';
      break;
    }
  }

}
