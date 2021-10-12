import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSupabaseService } from 'ngx-supabase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  signUpUser() {
    this.supabase.user
      .signUp(this.signUpForm.value)
      .subscribe((data) => console.log('signup', data));
  }

  signInUser() {
    this.supabase.user
      .signIn(this.logInForm.value)
      .subscribe((data) => console.log('signin', data));
  }

  constructor(private supabase: NgxSupabaseService) {}

  ngOnInit() {
    this.supabase.rest
      .selectFrom('locations', {
        columns: 'city,name',
        filter: {
          name: {
            filter: 'eq',
            value: 'TOPI',
          },
        },
      })
      .subscribe(
        (data) => console.log(data),
        (err) => console.table(err)
      );
    this.supabase.rest.getCollumsFrom('locations').subscribe(console.table);
    // HalloWelt
    // sfsfsdgdgf
    // this.supabase.user
    //   .update({
    //     email: 'hurz@hurz.com',
    //   })
    //   .subscribe(console.table);
  }
}
