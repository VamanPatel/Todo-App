import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../Shared/Auth/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
