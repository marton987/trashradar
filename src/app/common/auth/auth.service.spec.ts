import {
  Response,
  ResponseOptions,
  BaseRequestOptions
} from '@angular/http';
import { AuthService } from './auth.service';
import { MockBackend } from '@angular/http/testing';
import { DjangoClientService } from '../django-client/django-client.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/Rx';
import { Authorization } from './auth.model';
import { AuthActions } from './auth.actions';

describe('AuthService', () => {
  let mockBackend: MockBackend;
  let authService: AuthService;
  let apiClient: DjangoClientService;
  let storage: LocalStorageService;
  let store;
  let authActions;
  let storeSubject: BehaviorSubject<object>;

  const successBody: Authorization = {
    id: 2,
    email: 'real@email.com',
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
    username: 'test',
    token: 'token',
  };

  const errorBody = {
    message: 'Username or password invalid'
  };

  const mockResponse = new Response(new ResponseOptions({
    body: JSON.stringify(successBody),
    status: 200,
    statusText: 'Success'
  }));

  const mockResponseLogout = new Response(new ResponseOptions({
    status: 200,
    statusText: 'Success'
  }));

  const mockResponseError = new Response(new ResponseOptions({
    body: JSON.stringify(errorBody),
    status: 401,
    statusText: 'Unauthorized'
  }));

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => storeSubject;
  }

  class MockAuthActions {
    public loginSuccess = jasmine.createSpy('loginSuccess');
  }

  const data = {
    first_name: 'Jane',
    last_name: 'Doe'
  };

  beforeEach(() => {
    storeSubject = new BehaviorSubject(null);
    storage = new LocalStorageService();
    mockBackend = new MockBackend();
    apiClient = new DjangoClientService(mockBackend, new BaseRequestOptions());
    store = new MockStore();
    authActions = new MockAuthActions();

    authService = new AuthService(apiClient, storage, store, authActions);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should update storage on user events', () => {
    expect(storage.retrieve('user')).toBe(null, 'Storage should start empty');
    storeSubject.next(successBody);
    expect(storage.retrieve('user')).toBe(successBody, 'Should have updated user');
  });

  it('should return the errors if the credentials are incorrect', () => {
    const credentials = { username: 'jane@doe.com', password: 'incorrectPassword' };

    mockBackend.connections.subscribe((connection) => {
      connection.mockError(mockResponseError);
    });

    authService.login(credentials).subscribe(
      null,
      (error) => {
        expect(error).toBe(mockResponseError);
        expect(storage.retrieve('user'))
          .toEqual(null, 'User data not saved in storage');
      },
      null
    );

  });

  it('should login users with proper credentials', () => {
    const credentials = { username: 'jane@doe.com', password: 'password' };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    spyOn(apiClient, 'setAuthToken');

    authService.login(credentials).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      expect(apiClient.setAuthToken).toHaveBeenCalledWith(successBody.token);
    });
  });

  it('should set the Auth Token when it is created, if the user is already logged in', () => {
    spyOn(apiClient, 'setAuthToken');
    storage.store('user', successBody);
    const aNewAuthService = new AuthService(apiClient, storage, store, authActions);
    expect(apiClient.setAuthToken).toHaveBeenCalledWith(successBody.token);
    expect(authActions.loginSuccess).toHaveBeenCalledWith(successBody);
  });

  it('should logout users', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseLogout);
    });
    spyOn(apiClient, 'setAuthToken');

    const credentials = { username: 'jane@doe.com', password: 'password' };
    storage.store('user', successBody);
    authService.logout().subscribe(() => {
      expect(apiClient.setAuthToken).toHaveBeenCalledWith();
    });
  });

  it('should login and keep user credentials across AuthService instances', () => {
    const credentials = { username: 'jane@doe.com', password: 'password' };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });
    spyOn(apiClient, 'setAuthToken');

    authService.login(credentials).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      storage.store('user', successBody);
      const authService2 = new AuthService(apiClient, storage, store, authActions);
      expect(apiClient.setAuthToken).toHaveBeenCalledTimes(2);
      expect(authActions.loginSuccess).toHaveBeenCalledWith(successBody);
    });
  });

  it('should register new users', () => {
    const credentials = { email: 'jane@doe.com', username: 'jane@doe.com',
      password: 'password' };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });
    spyOn(apiClient, 'setAuthToken');

    authService.register(credentials).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      expect(apiClient.setAuthToken).toHaveBeenCalledWith(successBody.token);
    });
  });

});
