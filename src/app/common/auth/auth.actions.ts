import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class AuthActions {
  public static LOGIN = '[Auth] LOGIN';
  public static LOGIN_SUCCESS = '[Auth] LOGIN Success';
  public static LOGIN_FAILED = '[Auth] LOGIN Failed';
  public static LOGOUT = '[Auth] LOGOUT';

  public login = ActionCreatorFactory.create(AuthActions.LOGIN);
  public loginSuccess = ActionCreatorFactory.create(AuthActions.LOGIN_SUCCESS);
  public loginFailed = ActionCreatorFactory.create(AuthActions.LOGIN_FAILED);
  public logout = ActionCreatorFactory.create(AuthActions.LOGOUT);
}
