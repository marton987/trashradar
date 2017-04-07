import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
  HomeComponent,
  LoginComponent,
  LandingComponent
];
