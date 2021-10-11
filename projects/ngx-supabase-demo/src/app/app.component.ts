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
    this.supabase
      .signUpUser(this.signUpForm.value)
      .subscribe((data) => console.log('signup', data));
  }

  signInUser() {
    this.supabase
      .signInUser({ email: 'dave@webdave.de', password: 'HalloWelt' })
      .subscribe((data) => console.log('signin', data));
  }

  constructor(private supabase: NgxSupabaseService) {}

  ngOnInit() {
    this.supabase
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
    this.supabase.getCollumsFrom('locations').subscribe(console.table);
    // HalloWelt
    // sfsfsdgdgf
    // this.supabase
    //   .select('locations', {
    //     columns: 'city,name',
    //     filter: {
    //       name: {
    //         filter: 'eq',
    //         value: 'TOPI',
    //       },
    //     },
    //   })
    //   .subscribe((data) => console.log(data));
  }
}
