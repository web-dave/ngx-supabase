import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  AuthChangeEvent,
  createClient,
  Provider,
  Session,
  Subscription,
  SupabaseClient,
  User,
  UserCredentials,
  VerifyOTPParams,
} from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSupabaseConfig } from './ngx-supabase.config';
import { NgxSupabaseRestService } from './ngx-supabase.rest.service';
import {
  NgxSupaBaseSuccessResponse,
  SelectFromParams,
} from './ngx-supabase.types';
import { NgxSupabaseUserService } from './ngx-supabase.user.service';

@Injectable()
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

  restUrl: string;
  // auth
  constructor(
    private config: NgxSupabaseConfig,
    private http: HttpClient,
    public user: NgxSupabaseUserService,
    public rest: NgxSupabaseRestService
  ) {
    this.client = createClient(
      config.supabaseUrl,
      config.supabaseKey,
      config.options
    );

    this.restUrl = `${this.config.supabaseUrl}rest/v1/`;
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
    return this.http.get<NgxSupaBaseSuccessResponse[]>(url);
  }
  getCollumsFrom(tbl: string): Observable<string[]> {
    return this.selectFrom(tbl).pipe(
      map((data) => (data[0] ? Object.keys(data[0] || {}) : []))
    );
  }
}
