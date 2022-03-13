import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);

    this.form = this.fb.group({
      email: this.email,
      password: this.password,
    });
    console.log(this.email.valid);
  }

  ngOnInit(): void {}
  forgotPassword() {}
}
