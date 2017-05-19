/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MenuComponent } from './main/menu/menu.component';
import { LandingComponent } from './landing/landing.component';
import { NavBarComponent } from './landing/nav-bar/nav-bar.component';
import { HeaderComponent } from './landing/header/header.component';
import { DetailComponent } from './landing/detail/detail.component';
import { AboutComponent } from './landing/about/about.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NgbModule.forRoot()
      ],
      declarations: [
        AppComponent,
        MenuComponent,
        AboutComponent,
        DetailComponent,
        HeaderComponent,
        NavBarComponent,
        LandingComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
