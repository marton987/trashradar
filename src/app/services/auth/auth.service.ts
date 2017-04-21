import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';

import { Authorization, Credentials, RegistrationCredentials } from './auth.model';
import { DjangoClientService } from '../django-client/django-client.service';

@Injectable()
export class AuthService {
  public user$: BehaviorSubject<Authorization>;

  @LocalStorage('user', null)
  private user: Authorization;

  constructor(private httpService: DjangoClientService, private storage: LocalStorageService) {
    this.user$ = new BehaviorSubject<Authorization>(this.user);
    this.storage.observe('user').subscribe(this.user$);

    if (this.user && this.user.token) {
        this.httpService.setAuthToken(this.user.token);
    }
  }

  public isLoggedIn(): boolean {
    return !!this.user;
  }

  public login(userData: Credentials): Observable<Authorization> {
    return this.httpService.post('/auth/login/', userData)
      .map((user: Authorization) => {
        this.httpService.setAuthToken(user.token);
        this.user = user;

        return user;
      });
  }

  public register(userData: RegistrationCredentials): Observable<Authorization> {
    return this.httpService.post('/api/1/user/', userData)
      .map((user: Authorization) => {
        this.httpService.setAuthToken(user.token);
        this.user = user;

        return user;
      });
  }

  public logout(): Observable<any> {
    return this.httpService.post('/auth/logout/', {})
      .subscribe((res: any) => {
        this.httpService.setAuthToken();
        this.user = null;
      });
  }

}
