/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LandingComponent } from './landing/landing.component';
import { NavBarComponent } from './landing/nav-bar/nav-bar.component';
import { HeaderComponent } from './landing/header/header.component';
import { DetailComponent } from './landing/detail/detail.component';
import { AboutComponent } from './landing/about/about.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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

  it(`should have as title 'Trash Radar'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Trash Radar');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Trash Radar');
  }));
});
