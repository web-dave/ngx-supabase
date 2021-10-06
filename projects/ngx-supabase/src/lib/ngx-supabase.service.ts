import { Injectable } from '@angular/core';

import {
  createClient,
  PostgrestResponse,
  Session,
  SupabaseClient,
  User,
  UserCredentials,
} from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NgxSupabaseConfig } from './ngx-supabase.config';

@Injectable({
  providedIn: 'root',
})
export class NgxSupabaseService {
  client: SupabaseClient;
  signUp(value: UserCredentials): Observable<{
    user: User | null;
    session: Session | null;
    error: Error | null;
    data: User | Session | null;
  }> {
    return from(this.client.auth.signUp(value));
  }

  selectFrom(
    tbl: string,
    columns?: string | undefined,
    options?:
      | {
          head?: boolean | undefined;
          count?: 'exact' | 'planned' | 'estimated' | null | undefined;
        }
      | undefined
  ): Observable<PostgrestResponse<{ [key: string]: any }>> {
    return from(
      this.client.from<{ [key: string]: any }>(tbl).select(columns, options)
    );
  }

  getCollumsFrom(tbl: string): Observable<string[]> {
    return from(this.client.from<{ [key: string]: any }>(tbl)).pipe(
      map((data) => Object.keys(data.body?.[0] || {}))
    );
  }

  constructor(private config: NgxSupabaseConfig) {
    this.client = createClient(
      config.supabaseUrl,
      config.supabaseKey,
      config.options
    );
  }
}
