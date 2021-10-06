# NgxSupabase

Angular Module to use supabase with angular.

## get started

### install it

```bash
npm i ngx-supabase
```

### add it to your module

you need a `env.ts` file with your supabase creds

```ts
import { NgxSupabaseConfig } from "ngx-supabase";

export const config: NgxSupabaseConfig = {
  supabaseUrl: "",
  supabaseKey: "",
};
```

```ts
import { NgxSupabaseModule } from 'ngx-supabase';
import { config } from '../env';

@NgModule({
  imports: [
    ...,
    NgxSupabaseModule.forRoot(config),
  ],
})
export class YourModule {}

```

and you are ready to go.

### API

#### SIGNUP

```ts
signUp(value: UserCredentials): Observable<{
    user: User | null;
    session: Session | null;
    error: Error | null;
    data: User | Session | null;
  }>
```

#### GET DATA FROM TABLE

```ts
selectFrom(
    tbl: string,
    columns?: string | undefined,
    options?:
      | {
          head?: boolean | undefined;
          count?: 'exact' | 'planned' | 'estimated' | null | undefined;
        }
      | undefined
  ): Observable<PostgrestResponse<{ [key: string]: any }>>
```

#### GET COLLUM NAMES FROM TABLE

```ts
getCollumsFrom(tbl: string): Observable<string[]>
```
