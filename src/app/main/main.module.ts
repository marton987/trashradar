import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

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
  providers: []
})
export class MainModule {}
