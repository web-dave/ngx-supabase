export interface SelectFromOptions {
  head?: boolean | undefined;
  count?: 'exact' | 'planned' | 'estimated' | null | undefined;
}

export interface NgxAuthResponse {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: string;
  confirmation_sent_at: string;
  email_change_confirm_status: number;
  app_metadata: { provider: string };
  user_metadata: {};
  created_at: string;
  updated_at: string;
}

export type SupabaseFilter =
  | 'eq'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'like'
  | 'ilike'
  | 'is'
  | 'in'
  | 'neq';

export interface SelectFromFilter {
  [column: string]: {
    filter: SupabaseFilter;
    value: number | string | boolean;
  };
}

export interface SelectFromParams {
  options?: SelectFromOptions | undefined;
  columns?: string | undefined;
  filter?: SelectFromFilter;
}

export interface NgxSupaBaseSuccessResponse {
  [key: string]: any;
}
