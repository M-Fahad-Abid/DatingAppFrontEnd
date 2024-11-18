import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';
import { map } from 'rxjs';
import { Login } from '../models/account/login';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/account/register';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = environment.urlHttps;

  signal = signal<User | null>(null);

  login(model: any) {
    return this.http.post<Login>(this.baseUrl + 'account/login', model).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('userCreds', JSON.stringify(user));
          this.signal.set(user);
        }
      })
    );
  }

  register(model: Register) {
    return this.http
      .post<User>(this.baseUrl + 'account/register-user', model)
      .pipe(
        map((user: any) => {
          if (user) {
            localStorage.setItem('userCreds', JSON.stringify(user));
            this.signal.set(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('userCreds');
    this.signal.set(null);
  }
}
