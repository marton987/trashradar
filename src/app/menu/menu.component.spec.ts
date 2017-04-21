/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { LocalStorageService } from 'ngx-webstorage';

import { DjangoClientService, AuthService } from '../services';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const mockBackend: MockBackend = new MockBackend();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [ MenuComponent ],
      providers: [
        AuthService,
        LocalStorageService,
        {
          provide: DjangoClientService,
          useFactory: () => { return new DjangoClientService(mockBackend, new BaseRequestOptions()); }
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
