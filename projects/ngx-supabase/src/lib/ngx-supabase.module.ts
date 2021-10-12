import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSupabaseConfig } from './ngx-supabase.config';
import { NgxSupabaseAuthInterceptor } from './ngx-supabase-auth.interceptor';
import { NgxSupabaseService } from './ngx-supabase.service';
import { NgxSupabaseUserService } from './ngx-supabase.user.service';
import { NgxSupabaseRestService } from './ngx-supabase.rest.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [
    NgxSupabaseService,
    NgxSupabaseUserService,
    NgxSupabaseRestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgxSupabaseAuthInterceptor,
      multi: true,
    },
  ],
})
export class NgxSupabaseModule {
  static forRoot(
    config: NgxSupabaseConfig
  ): ModuleWithProviders<NgxSupabaseModule> {
    return {
      ngModule: NgxSupabaseModule,
      providers: [{ provide: NgxSupabaseConfig, useValue: config }],
    };
  }
}
