import {
  Response,
  ResponseOptions,
  BaseRequestOptions
} from '@angular/http';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Authorization } from './auth.model';
import { BehaviorSubject } from 'rxjs/Rx';

class MockAuthService {
  public user$ = new BehaviorSubject(null);
}

class MockRouter {
  public navigate = jasmine.createSpy('navigate');
}

describe('AuthGuard', () => {
  let authService: MockAuthService;
  let authGuard: AuthGuard;
  let router: MockRouter;

  beforeEach(() => {
    authService = new MockAuthService();
    router = new MockRouter();
    authGuard = new AuthGuard(authService as AuthService, router as any);
  });

  it('should return true when user token present', () => {
    authService.user$.next({ token: 'realToken' });
    expect(authGuard.canActivate(null, null)).toEqual(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should attempt to navigate to login on missing token', () => {
    expect(authGuard.canActivate(null, null)).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

});
