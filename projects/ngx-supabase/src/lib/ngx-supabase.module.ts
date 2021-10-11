import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxSupabaseConfig } from './ngx-supabase.config';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
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
