import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCredentials, UserAttributes } from '@supabase/supabase-js';
import { NgxAuthResponse, NgxSignInResponse } from './ngx-supabase.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSupabaseConfig } from './ngx-supabase.config';

@Injectable()
export class NgxSupabaseUserService {
  private scope = 'auth/v1';
  private currentUser: User | null = null;

  private authEndpoints: { [key: string]: string };

  constructor(public config: NgxSupabaseConfig, private http: HttpClient) {
    this.authEndpoints = {
      signup: `${this.config.supabaseUrl}${this.scope}/signup`,
      logout: `${this.config.supabaseUrl}${this.scope}/logout`,
      magiclink: `${this.config.supabaseUrl}${this.scope}/magiclink`,
      otp: `${this.config.supabaseUrl}${this.scope}/otp`,
      verify: `${this.config.supabaseUrl}${this.scope}/verify`,
      user: `${this.config.supabaseUrl}${this.scope}/user`,
      recover: `${this.config.supabaseUrl}${this.scope}/recover`,
      invite: `${this.config.supabaseUrl}${this.scope}/invite`,
      token: `${this.config.supabaseUrl}${this.scope}/token?grant_type=password`,
    };
  }

  signUp(value: UserCredentials): Observable<NgxAuthResponse> {
    const url = this.authEndpoints.signup;
    return this.http.post<NgxAuthResponse>(url, value);
  }

  signIn(value: UserCredentials): Observable<NgxAuthResponse> {
    const url = this.authEndpoints.token;
    return this.http.post<NgxSignInResponse>(url, value).pipe(
      map((res) => {
        localStorage.setItem('access_token', res.access_token);
        this.currentUser = res.user;
        return res.user;
      })
    );
  }

  logOut() {
    const url = this.authEndpoints.logout;
    return this.http.post<{
      data: User | null;
      user: User | null;
      error: Error | null;
    }>(url, {});
  }

  update(
    attributes: UserAttributes
  ): Observable<{ data: User | null; user: User | null; error: Error | null }> {
    const url = this.authEndpoints.user;
    return this.http.put<{
      data: User | null;
      user: User | null;
      error: Error | null;
    }>(url, attributes);
  }

  user(): User | null {
    return this.currentUser;
  }
}
