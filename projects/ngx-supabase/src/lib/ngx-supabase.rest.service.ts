import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NgxSupaBaseSuccessResponse,
  SelectFromParams,
} from './ngx-supabase.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSupabaseConfig } from './ngx-supabase.config';

@Injectable()
export class NgxSupabaseRestService {
  private restUrl: string;

  constructor(public config: NgxSupabaseConfig, private http: HttpClient) {
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
