import { Component, OnInit } from '@angular/core';
import { AuthActions } from '../../common/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private authActions: AuthActions, private router: Router, private store: Store<any>) { }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(this.authActions.logout());
    this.router.navigate(['/']);
  }

}
