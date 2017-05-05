import { Injectable } from '@angular/core';
import { ConnectionBackend, Headers, Http,
         Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { environment } from '../../../environments/environment';

@Injectable()
export class DjangoClientService extends Http {
  private baseUrl = environment.baseUrl;
  private token;

  public errors$: Subject<any> = new Subject<any>();

  public static factory(backend, options) {
    return new DjangoClientService(backend, options);
  }

  public static provider() {
    return {
      provide: DjangoClientService,
      deps: [XHRBackend, RequestOptions],
      useFactory: DjangoClientService.factory
    };
  }


  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  public setBaseUrl(url?: string) {
    this.baseUrl = url;
    this._defaultOptions.url = url;
  }

  public setAuthToken(token?: string) {
    this._defaultOptions.headers.delete('Authorization');
    if (token) {
      this._defaultOptions.headers.append('Authorization', 'Token ' + token);
    }
    this.token = token;
  }

  public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      url = this.composeUrl(url);
    } else if (url instanceof Request) {
      url.url = this.composeUrl(url.url);
    }
    return super.request(url, options);
  }

  public get(url: string, options?: RequestOptions): Observable<any> {
    return super.get(url, options)
      .map((response) => response.json())
      .catch((error) => this.catchAndRethrowError(error));
  }

  public post(url: string, data: Object, options?: RequestOptions): Observable<any> {
    return super.post(url, data, options)
                     .map((response) => response.json())
                     .catch((error) => this.catchAndRethrowError(error));
  }

  public put(url: string, data: Object, options?: RequestOptions): Observable<any> {
    return super.put(url, data, options)
                     .map((response) => response.json())
                     .catch((error) => this.catchAndRethrowError(error));
  }

  public delete(url: string, options?: RequestOptions): Observable<any> {
    return super.delete(url, options)
                     .map((response) => response.json())
                     .catch((error) => this.catchAndRethrowError(error));
  }

  protected composeUrl(url: string): string {
    // do not compose if the method received a full URL.
    if (url.indexOf('http') === 0) {
      return url;
    }
    // only compose if baseUrl is set.
    return (this.baseUrl) ? this.baseUrl + url : url;
  }

  private catchAndRethrowError(error: any) {
    this.errors$.next(error);
    return Observable.throw(error);
  }

}
