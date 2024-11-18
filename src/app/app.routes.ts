import { Routes } from '@angular/router';
import { RegisterComponent } from './components/main/account/register/register.component';
import { HomeComponent } from './components/main/home/home.component';
import { LearnMoreComponent } from './components/main/learn-more/learn-more.component';
import { NotFoundComponent } from './components/other/not-found/not-found.component';
import { AccessDeniedComponent } from './components/other/access-denied/access-denied.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'unavailable', component: AccessDeniedComponent },
  { path: 'user-register', component: RegisterComponent },
  { path: 'learn-more', component: LearnMoreComponent },
  { path: '**', component: NotFoundComponent },
];
