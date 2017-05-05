import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', children: [
      { path: '', component: LoginComponent },
    ]
  }
];

@NgModule({
  bootstrap: [ LoginComponent ],
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class AuthModule {}
