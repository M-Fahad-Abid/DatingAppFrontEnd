import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { ResponseUser } from '../models/response-user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.urlHttps + 'admin/';
  private http = inject(HttpClient);

  getUsersWithRoles() {
    return this.http.get<ResponseUser[]>(this.baseUrl + 'user-with-roles');
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post<string[]>(
      this.baseUrl + 'edit-roles/' + username + '?roles=' + roles,
      {}
    );
  }
}
