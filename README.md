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
  SignUp /Register

```ts
signUp(value: UserCredentials): Observable<NgxAuthResponse>
```

SignIn

```ts
signIn(value: UserCredentials): Observable<NgxAuthResponse>
```

get the current logged in user

```ts
user(): User | null
```

Logout

```ts
 logOut(): Observable<Error | null>
```

update Userdetails

```ts
 update(
    attributes: UserAttributes
  ): Observable<{ data: User | null; user: User | null; error: Error | null }>
```

- # rest

get data from table

```ts
selectFrom(
    tbl: string,
    params?: SelectFromParams
  ): Observable<NgxSupaBaseSuccessResponse[]>
```

get collum names from table

```ts
getCollumsFrom(tbl: string): Observable<string[]>
```
