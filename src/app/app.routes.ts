import { Routes } from '@angular/router';
import { LoginComponent } from './components/main/account/login/login.component';
import { RegisterComponent } from './components/main/account/register/register.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user-login', component: LoginComponent },
  { path: 'user-register', component: RegisterComponent },
];
