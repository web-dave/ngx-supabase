import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NgxSupaBaseSuccessResponse,
  SelectFromFilter,
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
    let filtersString = this.buildFilterstring(params?.filter);
    let selectString = this.buildSelectString(
      params?.columns,
      !!params?.filter
    );
    let queryString = !!params?.columns || !!params?.filter ? '?' : '';
    const url = this.restUrl + tbl + queryString + filtersString + selectString;
    return this.http.get<NgxSupaBaseSuccessResponse[]>(url);
  }

  getCollumsFrom(tbl: string): Observable<string[]> {
    return this.selectFrom(tbl).pipe(
      map((data) => (data[0] ? Object.keys(data[0] || {}) : []))
    );
  }

  insertInto(
    tbl: string,
    data: { [key: string]: any }[],
    upsert = false
  ): Observable<NgxSupaBaseSuccessResponse[]> {
    const url = this.restUrl + tbl;
    const headers: { Prefer?: string } = {};
    if (upsert) {
      headers.Prefer = 'resolution=merge-duplicates';
    }

    return this.http.post<NgxSupaBaseSuccessResponse[]>(url, data, { headers });
  }

  updateIn(
    tbl: string,
    data: { [key: string]: any },
    params: SelectFromParams
  ): Observable<NgxSupaBaseSuccessResponse[]> {
    const url = this.restUrl + tbl + this.buildFilterstring(params?.filter);
    return this.http.patch<NgxSupaBaseSuccessResponse[]>(url, data, {
      headers: { Prefer: 'return=representation' },
    });
  }

  deleteFrom(tbl: string, params: SelectFromParams) {
    const url = this.restUrl + tbl + this.buildFilterstring(params?.filter);
    return this.http.delete<any>(url);
  }

  private buildFilterstring(data: SelectFromFilter = {}): string {
    let filtersString = '';
    if (data) {
      filtersString = Object.keys(data)
        .map((key) => {
          const { filter, value } = data?.[key];
          return `${key}=${filter}.${value}`;
        })
        .join('&');
    }
    return filtersString;
  }

  private buildSelectString(colums?: string, filter: boolean = false): string {
    const amp = filter ? '&' : '';
    return colums ? amp + 'select=' + colums : '';
  }
}
