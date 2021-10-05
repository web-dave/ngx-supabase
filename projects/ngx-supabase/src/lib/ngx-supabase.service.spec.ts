import { TestBed } from '@angular/core/testing';

import { NgxSupabaseService } from './ngx-supabase.service';

describe('NgxSupabaseService', () => {
  let service: NgxSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
