import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  AuthChangeEvent,
  createClient,
  PostgrestResponse,
  Provider,
  Session,
  Subscription,
  SupabaseClient,
  User,
  UserAttributes,
  UserCredentials,
  VerifyOTPParams,
} from '@supabase/supabase-js';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NgxSupabaseConfig } from './ngx-supabase.config';
import {
  NgxAuthResponse,
  NgxSignInResponse,
  NgxSupaBaseSuccessResponse,
  SelectFromParams,
} from './ngx-supabase.types';

@Injectable({
  providedIn: 'root',
})
export class NgxSupabaseService {
  client: SupabaseClient;

  // auth
  signUp(value: UserCredentials): Observable<{
    user: User | null;
    session: Session | null;
    error: Error | null;
    data: User | Session | null;
  }> {
    return from(this.client.auth.signUp(value));
  }
  signIn(value: UserCredentials): Observable<{
    user: User | null;
    session: Session | null;
    error: Error | null;
    data: User | Session | null;
    provider?: Provider | null;
    url?: string | null;
  }> {
    return from(this.client.auth.signIn(value));
  }

  getSessionFromUrl(options?: {
    storeSession?: boolean | undefined;
  }): Observable<{
    data: Session | null;
    error: Error | null;
  }> {
    return from(this.client.auth.getSessionFromUrl(options));
  }

  onAuthStateChange(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ): {
    data: Subscription | null;
    error: Error | null;
  } {
    return this.client.auth.onAuthStateChange(callback);
  }
  refreshSession(): Observable<{
    data: Session | null;
    user: User | null;
    error: Error | null;
  }> {
    return from(this.client.auth.refreshSession());
  }
  session(): Session | null {
    return this.client.auth.session();
  }
  setAuth(access_token: string): Session {
    return this.client.auth.setAuth(access_token);
  }
  setSession(
    access_token: string
  ): Observable<{ session: Session | null; error: Error | null }> {
    return from(this.client.auth.setSession(access_token));
  }

  signOut(): Observable<{ error: Error | null }> {
    return from(this.client.auth.signOut());
  }

  update(
    attributes: UserAttributes
  ): Observable<{ data: User | null; user: User | null; error: Error | null }> {
    return from(this.client.auth.update(attributes));
  }

  user(): Observable<User | null> {
    return of(this.client.auth.user());
  }
  verifyOTP(
    params: VerifyOTPParams,
    options: {
      redirectTo?: string;
    } = {}
  ): Observable<{
    user: User | null;
    session: Session | null;
    error: Error | null;
    data: Session | User | null; // Deprecated
  }> {
    return from(this.client.auth.verifyOTP(params, options));
  }

  // from
  select(
    tbl: string,
    params?: SelectFromParams
  ): Observable<PostgrestResponse<{ [key: string]: any }>> {
    // if (params?.filter) {
    //   this.buildQuery();
    // }
    return from(
      this.client
        .from<{ [key: string]: any }>(tbl)
        .select(params?.columns, params?.options)
        .eq('name', 'TOPI')
    );
  }

  headers: HttpHeaders;
  restUrl: string;
  authUrl: string;
  // auth
  constructor(private config: NgxSupabaseConfig, private http: HttpClient) {
    this.client = createClient(
      config.supabaseUrl,
      config.supabaseKey,
      config.options
    );

    this.headers = new HttpHeaders({
      authority: config.supabaseUrl.replace('https://', ''),
      apikey: config.supabaseKey,
    });

    this.restUrl = `${this.config.supabaseUrl}rest/v1/`;
    this.authUrl = `${this.config.supabaseUrl}auth/v1/`;
  }

  selectFrom(
    tbl: string,
    params?: SelectFromParams
  ): Observable<NgxSupaBaseSuccessResponse[]> {
    const url =
      this.restUrl +
      tbl +
      '?' +
      (params?.columns ? 'select=' + params.columns : '');
    return this.http.get<NgxSupaBaseSuccessResponse[]>(url, {
      headers: this.headers,
    });
  }
  getCollumsFrom(tbl: string): Observable<string[]> {
    return this.selectFrom(tbl).pipe(
      map((data) => (data[0] ? Object.keys(data[0] || {}) : []))
    );
  }

  signUpUser(value: UserCredentials): Observable<NgxAuthResponse> {
    const url = this.authUrl + 'signup';
    return this.http.post<NgxAuthResponse>(url, value, {
      headers: this.headers,
    });
  }
  signInUser(value: UserCredentials): Observable<NgxAuthResponse> {
    const url = this.authUrl + 'token?grant_type=password';
    return this.http
      .post<NgxSignInResponse>(url, value, {
        headers: this.headers,
      })
      .pipe(
        map((res) => {
          localStorage.setItem('access_token', res.access_token);
          return res.user;
        })
      );
  }
}
