import { ModuleWithProviders, NgModule } from '@angular/core';
import { SupabaseConfig } from './supabase.config';

@NgModule({
  declarations: [],
  imports: [],
})
export class NgxSupabaseModule {
  static forRoot(
    config: SupabaseConfig
  ): ModuleWithProviders<NgxSupabaseModule> {
    return {
      ngModule: NgxSupabaseModule,
      providers: [{ provide: SupabaseConfig, useValue: config }],
    };
  }
}
