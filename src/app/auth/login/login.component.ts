import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Credentials, AuthActions } from '../../common/auth';
import { getAuthState } from '../../common/store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public credentials: Credentials = {
    username: '',
    password: ''
  };
  public loading;
  public errorMessage = '';

  constructor(private router: Router, private store: Store<any>, private authActions: AuthActions) {
    this.store.select(getAuthState).subscribe(({ isLoggedIn, inProgress, error }) => {
      if (isLoggedIn) {
        this.router.navigate(['app']);
        return;
      }
      this.loading = inProgress;

      if (error) {
        this.errorHandler(error);
      }
    });
  }

  login() {
    this.store.dispatch(this.authActions.login(this.credentials));
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
