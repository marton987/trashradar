import { Injectable } from '@angular/core';

import { ModelService } from '../model';
import { User } from './user.model';
import { DjangoClientService } from '../django-client';

/**
 * User Service.
 *
 * This service provides an interface to make User related requests
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService extends ModelService<User> {

  /**
   * Creates an instance of the UserService
   *
   * @param {DjangoClientService} apiHttp
   */
  constructor(apiHttp: DjangoClientService) {
    super('/api/v1/accounts', apiHttp);
  }

}
