import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false;
  isEmail: boolean = false;
  isPassword: boolean = false;

  form!: FormGroup;

  email!: FormControl;
  password!: FormControl;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snak: MatSnackBar
  ) {
    this.email = new FormControl('', [
      Validators.required,
      <any>this.EmailValidator(),
    ]);
    this.password = new FormControl('', [Validators.required]);

    this.form = this.fb.group({
      email: this.email,
      password: this.password,
    });
    console.log(this.email.valid);
  }

  ngOnInit(): void {}
  forgotPassword() {}

  EmailValidator() {
    return (control: FormControl) => {
      if (control.value) {
        if (
          !new RegExp(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ).test(control.value)
        ) {
          return { error: 'Invalid email' };
        }
      }
      return null;
    };
  }

  login() {
    this.isLogin = true;
    let data = {
      email: this.email.value,
      password: this.password.value,
    };

    this.auth.signIn(data).subscribe(
      (res) => {
        console.log(res.token);
        this.isLogin = false;
        localStorage.setItem('token', res.token);
        this.router.navigate(['todos']);
      },
      (err) => {
        console.error(err.error.error);
        this.isLogin = false;
        this.form.reset();
        this.snak.open(err.error.error, 'Ok', { duration: 3000 });
      }
    );
  }
}
