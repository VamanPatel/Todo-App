import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { signUp } from 'src/app/Components/signup/sigup.model';
import { environment } from 'src/environments/environment.prod';
import { signUpResponse } from '../api/signUpresponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private route: Router, private http: HttpClient) {}

  signIn(data: { email: any; password: any }) {
    return this.http.post<signUpResponse>(
      `${environment.api_url}/users/login`,
      data
    );
  }

  signup(data: signUp) {
    console.log(data);

    return this.http.post<signUpResponse>(`${environment.api_url}/users`, data);
  }
}
