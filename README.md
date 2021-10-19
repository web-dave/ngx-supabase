# NgxSupabase

Angular Module to use supabase with angular.

## get started

### install it

```bash
npm i ngx-supabase
```

### add it to your module

```ts
import { NgxSupabaseModule } from 'ngx-supabase';
import { NgxSupabaseConfig } from "ngx-supabase";

export const config: NgxSupabaseConfig = {
  supabaseUrl: "",
  supabaseKey: "",
};

@NgModule({
  imports: [
    ...,
    NgxSupabaseModule.forRoot(config),
  ],
})
export class YourModule {}

```

and you are ready to go.

NgxSupabaseService is now available via DI

```ts
constructor(private supabase: NgxSupabaseService) {
  // this.supabase.user
  // this.supabase.rest
}
```

### API

- # user
  `this.supabase.user`

```ts
signUp(value: UserCredentials): Observable<NgxAuthResponse>
```

```ts
signIn(value: UserCredentials): Observable<NgxAuthResponse>
```

```ts
user(): User | null
```

```ts
 logOut(): Observable<Error | null>
```

```ts
 update(
    attributes: UserAttributes
  ): Observable<{ data: User | null; user: User | null; error: Error | null }>
```

- # rest
  `this.supabase.rest`

```ts
selectFrom(
    tbl: string,
    params?: SelectFromParams
  ): Observable<NgxSupaBaseSuccessResponse[]>
```

```ts
getCollumsFrom(tbl: string): Observable<string[]>
```

```ts
insertInto(
    tbl: string,
    data: { [key: string]: any }[],
    upsert = false
  ): Observable<NgxSupaBaseSuccessResponse[]>
```

```ts
updateIn(
    tbl: string,
    data: { [key: string]: any },
    params: SelectFromParams
  ): Observable<NgxSupaBaseSuccessResponse[]>
```

```ts
deleteFrom(tbl: string, params: SelectFromParams)
```
