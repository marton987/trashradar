import {
  Response,
  ResponseOptions,
  BaseRequestOptions
} from '@angular/http';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Authorization } from './auth.model';
import { BehaviorSubject } from 'rxjs/Rx';
import { initialAuthState } from './auth.state';

class MockRouter {
  public navigate = jasmine.createSpy('navigate');
}

describe('AuthGuard', () => {
  let store: MockStore;
  let authGuard: AuthGuard;
  let router: MockRouter;
  let storeSubject: BehaviorSubject<object>;

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => storeSubject;
}

  beforeEach(() => {
    storeSubject = new BehaviorSubject(initialAuthState);
    store = new MockStore();
    router = new MockRouter();
    authGuard = new AuthGuard(store as any, router as any);
  });

  it('should return true when user token present', () => {
    storeSubject.next({ isLoggedIn: true });
    expect(authGuard.canActivate(null, null)).toEqual(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should attempt to navigate to login on missing token', () => {
    expect(authGuard.canActivate(null, null)).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });

});
