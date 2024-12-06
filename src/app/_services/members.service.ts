import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member } from '../models/member';
import { AccountService } from './account.service';
import { of, tap } from 'rxjs';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  baseUrl = environment.urlHttps;

  users = signal<Member[]>([]);

  getAllUsers() {
    return this.http
      .get<Member[]>(this.baseUrl + 'user/get-all-users')
      .subscribe({
        next: (response) => this.users.set(response),
      });
  }

  getuserByName(userName: string) {
    const user = this.users().find((x) => x.userName === userName);

    if (user != undefined) {
      return of(user);
    }

    return this.http.get<Member>(
      this.baseUrl + 'user/get-user-name/' + userName
    );
  }

  updateUserInfo(data: Member) {
    return this.http.put(this.baseUrl + 'user/update-user', data).pipe(
      tap(() => {
        this.users.update((value) =>
          value.map((m) => (m.userName === data.userName ? data : m))
        );
      })
    );
  }

  setMainPhoto(photo: Photo) {
    return this.http
      .put(this.baseUrl + 'user/set-main-photo/' + photo.id, {})
      .pipe(
        tap(() => {
          this.users.update((value) =>
            value.map((m) => {
              if (m.photos.includes(photo)) {
                m.photosUrl = photo.url;
              }
              return m;
            })
          );
        })
      );
  }

  deletePhoto(photo: Photo) {
    return this.http
      .delete(this.baseUrl + 'user/delete-photo/' + photo.id)
      .pipe(
        tap(() => {
          this.users.update((value) =>
            value.map((m) => {
              if (m.photos.includes(photo)) {
                m.photos = m.photos.filter((x) => x.id !== photo.id);
              }
              return m;
            })
          );
        })
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
