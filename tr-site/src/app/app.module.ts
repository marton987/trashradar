import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, provideRoutes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './landing/nav-bar/nav-bar.component';
import { HeaderComponent } from './landing/header/header.component';
import { DetailComponent } from './landing/detail/detail.component';
import { AboutComponent } from './landing/about/about.component';
import { LogoComponent } from './logo/logo.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '',     component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LandingComponent,
    HomeComponent,
    NavBarComponent,
    HeaderComponent,
    DetailComponent,
    AboutComponent,
    LogoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
