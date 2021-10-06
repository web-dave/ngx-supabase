import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxSupabaseConfig } from './ngx-supabase.config';

@NgModule({
  declarations: [],
  imports: [],
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
