import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { UserService } from '../common/user';

export const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  bootstrap: [ HomeComponent ],
  declarations: [
    HomeComponent,
    MenuComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [
    UserService,
  ]
})
export class MainModule {}
