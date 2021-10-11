import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable()
export class NgxSupabaseAuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    console.log('NgxSupabaseAuthInterceptor', req);
    return next.handle(req);
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
}
