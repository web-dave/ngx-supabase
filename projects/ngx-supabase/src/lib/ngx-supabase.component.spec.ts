import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSupabaseComponent } from './ngx-supabase.component';

describe('NgxSupabaseComponent', () => {
  let component: NgxSupabaseComponent;
  let fixture: ComponentFixture<NgxSupabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSupabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSupabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
