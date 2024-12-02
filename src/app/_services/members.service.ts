import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member } from '../models/member';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  baseUrl = environment.urlHttps;

  getAllUsers() {
    return this.http.get<Member[]>(this.baseUrl + 'user/get-all-users');
  }

  getuserByName(userName: string) {
    return this.http.get<Member>(
      this.baseUrl + 'user/get-user-name/' + userName
    );
  }

  // bearerToken() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${this.accountService.signal()?.token}`,
  //     }),
  //   };
  // }
}
