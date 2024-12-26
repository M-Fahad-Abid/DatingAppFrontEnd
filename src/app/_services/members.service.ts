import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Member } from "../models/member";
import { AccountService } from "./account.service";
import { of, tap } from "rxjs";
import { Photo } from "../models/photo";
import { PaginatedResult } from "../models/pagination";
import { UserParams } from "../models/user-params";
import { setPaginatedResponse, setPaginationHeader } from "./helpers/paginationHelper";

@Injectable({
    providedIn: "root",
})
export class MembersService {
    private accountService = inject(AccountService);
    private http = inject(HttpClient);
    baseUrl = environment.urlHttps;

    user = this.accountService.signal();
    userCache = new Map<string, any>();
    userParams = signal<UserParams>(new UserParams(this.user));

    // users = signal<Member[]>([]);
    paginatedResult = signal<PaginatedResult<Member[]> | null>(null);

    resetUserParams() {
        this.userParams.set(new UserParams(this.user));
    }

    getAllUsers() {
        const response = this.userCache.get(Object.values(this.userParams()).join("-"));

        if (response) return setPaginatedResponse(response, this.paginatedResult);

        let params = setPaginationHeader(this.userParams().pageNumber, this.userParams().pageSize);

        params = params.append("minAge", this.userParams().minAge);
        params = params.append("maxAge", this.userParams().maxAge);
        params = params.append("gender", this.userParams().gender);
        params = params.append("orderBy", this.userParams().orderBy);

        return this.http
            .get<Member[]>(this.baseUrl + "user/get-all-users", {
                observe: "response",
                params,
            })
            .subscribe({
                next: (response) => {
                    setPaginatedResponse(response, this.paginatedResult);
                    this.userCache.set(Object.values(this.userParams()).join("-"), response);
                },
            });
    }

    getuserByName(userName: string) {
        const member: Member = [...this.userCache.values()]
            .reduce((arr, elem) => arr.concat(elem.body), [])
            .find((m: Member) => m.userName === userName);

        if (member) return of(member);

        return this.http.get<Member>(this.baseUrl + "user/get-user-name/" + userName);
    }

    updateUserInfo(data: Member) {
        return this.http
            .put(this.baseUrl + "user/update-user", data)
            .pipe
            // tap(() => {
            //   this.users.update((value) =>
            //     value.map((m) => (m.userName === data.userName ? data : m)),
            //   );
            // }),
            ();
    }

    setMainPhoto(photo: Photo) {
        return this.http
            .put(this.baseUrl + "user/set-main-photo/" + photo.id, {})
            .pipe
            // tap(() => {
            //   this.users.update((value) =>
            //     value.map((m) => {
            //       if (m.photos.includes(photo)) {
            //         m.photosUrl = photo.url;
            //       }
            //       return m;
            //     }),
            //   );
            // }),
            ();
    }

    deletePhoto(photo: Photo) {
        return this.http
            .delete(this.baseUrl + "user/delete-photo/" + photo.id)
            .pipe
            // tap(() => {
            //   this.users.update((value) =>
            //     value.map((m) => {
            //       if (m.photos.includes(photo)) {
            //         m.photos = m.photos.filter((x) => x.id !== photo.id);
            //       }
            //       return m;
            //     })
            //   );
            // })
            ();
    }

    // bearerToken() {
    //   return {
    //     headers: new HttpHeaders({
    //       Authorization: `Bearer ${this.accountService.signal()?.token}`,
    //     }),
    //   };
    // }
}
