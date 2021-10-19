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

  insertInto() {}

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
