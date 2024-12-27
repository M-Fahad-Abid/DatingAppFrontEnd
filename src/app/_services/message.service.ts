import { inject, Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '../models/pagination';
import { Message } from '../models/message';
import {
  setPaginatedResponse,
  setPaginationHeader,
} from './helpers/paginationHelper';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.urlHttps;
  private http = inject(HttpClient);
  paginatedResult = signal<PaginatedResult<Message[]> | null>(null);

  //get-messages---
  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = setPaginationHeader(pageNumber, pageSize);

    params = params.append('Container', container);

    return this.http
      .get<Message[]>(this.baseUrl + 'messages/get-messages-for-user', {
        observe: 'response',
        params,
      })
      .subscribe({
        next: (response) =>
          setPaginatedResponse(response, this.paginatedResult),
      });
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(
      this.baseUrl + 'messages/thread/' + username
    );
  }

  sendMessages(username: string, content: string) {
    return this.http.post<Message>(this.baseUrl + 'messages/create-message', {
      recipientName: username,
      content,
    });
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
