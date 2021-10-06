import { SupabaseClientOptions } from '@supabase/supabase-js';

export abstract class NgxSupabaseConfig {
  supabaseUrl: string = '';
  supabaseKey: string = '';
  options?: SupabaseClientOptions;
}
