import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';

import { DjangoClientService, AuthService } from './services';
import { AuthGuard } from './services/auth/auth.guard';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NavBarComponent } from './landing/nav-bar/nav-bar.component';
import { HeaderComponent } from './landing/header/header.component';
import { DetailComponent } from './landing/detail/detail.component';
import { AboutComponent } from './landing/about/about.component';
import { LogoComponent } from './logo/logo.component';

import { routing, routedComponents } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NavBarComponent,
    HeaderComponent,
    DetailComponent,
    AboutComponent,
    LogoComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    routing,
    Ng2Webstorage,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    DjangoClientService.provider(),
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
