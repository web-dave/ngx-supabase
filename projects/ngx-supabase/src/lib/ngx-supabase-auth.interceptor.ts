import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { NgxSupabaseConfig } from './ngx-supabase.config';

@Injectable()
export class NgxSupabaseAuthInterceptor implements HttpInterceptor {
  private supabaseHeaders: { [key: string]: string };
  constructor(private config: NgxSupabaseConfig) {
    this.supabaseHeaders = {
      authority: this.config.supabaseUrl.replace('https://', ''),
      apikey: this.config.supabaseKey,
    };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.getToken();
    const headers: { [key: string]: string } = {
      ...this.supabaseHeaders,
    };
    if (authToken) {
      headers.Authorization = 'Bearer ' + authToken;
    }
    req = req.clone({
      setHeaders: headers,
    });
    return next.handle(req);
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
}
