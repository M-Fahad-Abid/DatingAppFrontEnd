import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';
import { map } from 'rxjs';
import { Login } from '../models/account/login';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/account/register';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = environment.urlHttps;
  private router = inject(Router);

  signal = signal<User | null>(null);

  login(model: any) {
    return this.http.post<Login>(this.baseUrl + 'account/login', model).pipe(
      map((user: any) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: Register) {
    return this.http.post<User>(this.baseUrl + 'account/register-user', model);
  }

  setCurrentUser(user: User) {
    localStorage.setItem('userCreds', JSON.stringify(user));
    this.signal.set(user);
  }

  logout() {
    localStorage.removeItem('userCreds');
    this.signal.set(null);
    this.router.navigateByUrl('/');
  }
}
