import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.urlHttps + 'admin/';
  private http = inject(HttpClient);

  getUsersWithRoles() {
    return this.http.get<User[]>(this.baseUrl + 'user-with-roles');
  }
}
