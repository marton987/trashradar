/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Credentials, AuthActions } from '../../common/auth';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockBackend: MockBackend = new MockBackend();
  let storeSubject: BehaviorSubject<object>;
  const router = {
    navigate: jasmine.createSpy('navigate'),
  };

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => storeSubject;
  }

  class MockAuthActions {
    public login = jasmine.createSpy('login');
  }


  beforeEach(async(() => {
    storeSubject = new BehaviorSubject({});

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: AuthActions, useClass: MockAuthActions },
        { provide: Router, useValue: router, },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading flag', () => {
    expect(component.loading).toBeFalsy();
    storeSubject.next({});
    expect(component.loading).toBeFalsy();
    storeSubject.next({ inProgress: true });
    expect(component.loading).toBeTruthy();
  });

  it('should attempt to navigate away on login', () => {
    storeSubject.next({});
    expect(router.navigate).not.toHaveBeenCalled();
    storeSubject.next({ isLoggedIn: true });
    expect(router.navigate).toHaveBeenCalledWith(['app']);
  });

  it('should dispatch login action', () => {
    const credentials = {
      username: 'test',
      password: 'real'
    };
    component.credentials = credentials;
    component.login();
    const actions = fixture.debugElement.injector.get(AuthActions);
    expect(actions.login).toHaveBeenCalledWith(credentials);
  });

  it('should set error messages', () => {
    // Should start clean
    expect(component.errorMessage).toEqual('', 'Expected no error message');

    // Should remain clean if no error
    storeSubject.next({});
    expect(component.errorMessage).toEqual('', 'Should remain empty');

    // Specific status messages
    storeSubject.next({
      error: { status: 404 }
    });
    expect(component.errorMessage).toEqual('Can\'t connect to the server.', 'Expected an error message');

    storeSubject.next({
      error: { status: 401 }
    });
    expect(component.errorMessage).toEqual('Wrong username or password.', 'Expected an error message');

    storeSubject.next({
      error: { status: 4 }
    });
    expect(component.errorMessage).toEqual('Unforseen error.');
  });

});
