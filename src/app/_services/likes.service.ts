import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import {
  setPaginatedResponse,
  setPaginationHeader,
} from './helpers/paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  baseUrl = environment.urlHttps;

  private http = inject(HttpClient);
  likeIds = signal<number[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);

  toggleLike(targetId: number) {
    return this.http.post(`${this.baseUrl}like/toggle-like/${targetId}`, {});
  }

  getLikesDetails(predicate: string, pageNumber: number, pageSize: number) {
    let params = setPaginationHeader(pageNumber, pageSize);

    params = params.append('predicate', predicate);

    return this.http
      .get<Member[]>(`${this.baseUrl}like/user-likes`, {
        observe: 'response',
        params,
      })
      .subscribe({
        next: (response) =>
          setPaginatedResponse(response, this.paginatedResult),
      });
  }

  getLikesIds() {
    return this.http
      .get<number[]>(`${this.baseUrl}like/user-likes-list`)
      .subscribe({
        next: (res) => this.likeIds.set(res),
      });
  }

  getMatches() {
    return this.http.get<any>(`${this.baseUrl}like/matches`);
  }
}
