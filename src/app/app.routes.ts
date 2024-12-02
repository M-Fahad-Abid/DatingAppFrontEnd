import { Routes } from '@angular/router';
import { RegisterComponent } from './components/main/account/register/register.component';

import { NotFoundComponent } from './components/other/not-found/not-found.component';
import { AccessDeniedComponent } from './components/other/access-denied/access-denied.component';

import { authGuard } from './_guards/auth.guard';
import { noAuthGuard } from './_guards/no-auth.guard';
import { MessagesComponent } from './components/main/screens/messages/messages.component';
import { MatchesComponent } from './components/main/screens/matches/matches.component';
import { UserDetailComponent } from './components/main/screens/user-detail/user-detail.component';
import { UsersComponent } from './components/main/screens/users/users.component';
import { HomeComponent } from './components/main/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  //app
  {
    path: '',
    canActivate: [authGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'user', component: UsersComponent },
      { path: 'user/:username', component: UserDetailComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'matches', component: MatchesComponent },
    ],
  },

  //account
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [noAuthGuard],
    children: [{ path: 'user-register', component: RegisterComponent }],
  },

  // { path: 'not-found', component: NotFoundComponent },
  { path: 'unavailable', component: AccessDeniedComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
