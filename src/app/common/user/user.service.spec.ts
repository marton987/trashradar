import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { DjangoClientService } from '../django-client';
import { UserService } from './user.service';

describe('UserService', () => {
  let mockBackend: MockBackend;
  let userService: UserService;
  let apiClient: DjangoClientService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new DjangoClientService(mockBackend, options);
    userService = new UserService(apiClient);
  });

  it('should create', () => {
    expect(userService).toBeTruthy();
  });
});
