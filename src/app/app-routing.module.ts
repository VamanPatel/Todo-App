import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './Shared/guard/auth.guard';
import { LoggedinGuard } from './Shared/guard/loggedin.guard';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AppComponent,
    canActivate: [LoggedinGuard],
    loadChildren: () =>
      import('./Components/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoggedinGuard],
})
export class AppRoutingModule {}
