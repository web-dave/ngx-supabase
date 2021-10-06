import { SupabaseClientOptions } from '@supabase/supabase-js';

export abstract class SupabaseConfig {
  supabaseUrl: string = '';
  supabaseKey: string = '';
  options?: SupabaseClientOptions;
}
