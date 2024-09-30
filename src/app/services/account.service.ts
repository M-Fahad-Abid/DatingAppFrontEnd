import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = environment.urlHttps;

  signal = signal<User | null>(null);

  login(model: User) {
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.signal.set(user);
        }
      })
    );
  }

  register(model: User) {
    return this.http.post<User>(this.http + 'Account/register-user', model);
  }

  logout() {
    localStorage.removeItem('user');
    this.signal.set(null);
  }
}
