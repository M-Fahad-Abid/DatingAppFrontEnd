import { Routes } from '@angular/router';
import { RegisterComponent } from './components/main/account/register/register.component';
import { HomeComponent } from './components/main/home/home.component';

import { NotFoundComponent } from './components/other/not-found/not-found.component';
import { AccessDeniedComponent } from './components/other/access-denied/access-denied.component';
import { LoginComponent } from './components/main/account/login/login.component';
import { MainComponent } from './components/main/screens/main/main.component';
import { authGuard } from './_guards/auth.guard';
import { noAuthGuard } from './_guards/no-auth.guard';
import { MessagesComponent } from './components/main/screens/messages/messages.component';
import { MatchesComponent } from './components/main/screens/matches/matches.component';
import { UserDetailComponent } from './components/main/screens/user-detail/user-detail.component';
import { UsersComponent } from './components/main/screens/users/users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  //app
  {
    path: '',
    canActivate: [authGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'main', component: MainComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'matches', component: MatchesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user-detail/:id', component: UserDetailComponent },
    ],
  },

  //account
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [noAuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'user-register', component: RegisterComponent },
    ],
  },

  { path: 'unavailable', component: AccessDeniedComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
