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
import { SupabaseConfig } from './supabase.config';

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
  ): Observable<PostgrestResponse<any>> {
    return from(this.client.from(tbl).select(columns, options));
  }

  constructor(private config: SupabaseConfig) {
    console.log(config);
    this.client = createClient(
      config.supabaseUrl,
      config.supabaseKey,
      config.options
    );
  }
}
