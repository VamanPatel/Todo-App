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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isSignup: boolean = false;
  isEmail: boolean = false;
  isPassword: boolean = false;

  form!: FormGroup;

  userName!: FormControl;
  email!: FormControl;
  age!: FormControl;
  password!: FormControl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private snak: MatSnackBar
  ) {
    this.email = new FormControl('', [Validators.required]);
    this.userName = new FormControl('', [Validators.required]);
    this.age = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);

    this.form = this.fb.group({
      userName: this.userName,
      email: this.email,
      password: this.password,
      age: this.age,
    });
    console.log(this.email.valid);
  }

  ngOnInit(): void {}

  signUp() {
    this.isSignup = true;
    let data = {
      name: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      age: this.age.value,
    };

    this.auth.signup(data).subscribe(
      (res) => {
        console.log(res.token);
        this.isSignup = false;
        localStorage.setItem('token', res.token);
        this.router.navigate(['todos']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
