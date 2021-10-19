import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
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
  constructor(
    public user: NgxSupabaseUserService,
    public rest: NgxSupabaseRestService
  ) {}
}
