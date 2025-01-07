import { inject, Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '../models/pagination';
import { Message } from '../models/message';
import {
  setPaginatedResponse,
  setPaginationHeader,
} from './helpers/paginationHelper';
import { environment } from '../../environments/environment.development';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { User } from '../models/user';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http = inject(HttpClient);

  baseUrl = environment.urlHttps;
  hubUrl = environment.hubsUrl;

  hubConnection?: HubConnection;
  paginatedResult = signal<PaginatedResult<Message[]> | null>(null);
  messageThread = signal<Message[]>([]);

  //Hub-Connection---
  createHubConnection(user: User, otherUsername: string) {
    // Log details about the connection being created
    console.log(
      'Creating hub connection with:',
      user,
      'and otherUsername:',
      otherUsername
    );

    // Build and configure the Hub connection
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    // Start the connection and handle any errors
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((error) => console.error('Error starting connection:', error));

    // Handle the ReceiveMessageThread event
    this.hubConnection.on('ReceiveMessageThread', (messages) => {
      console.log('Received message thread:', messages);
      this.messageThread.set(messages);
    });

    // Handle the NewMessage event
    this.hubConnection.on('NewMessage', (message) => {
      console.log('Received new message:', message);
      this.messageThread.update((messages) => [...messages, message]); // Corrected array spread
    });

    //Handle UpdatedGroups
    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (group.connections.some((x) => x.username === otherUsername)) {
        this.messageThread.update((messages) => {
          messages.forEach((message) => {
            if (!message.dateRead) {
              message.dateRead = new Date(Date.now());
            }
          });
          return messages;
        });
      }
    });
  }

  //stop-hub-connection---
  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch((error) => console.log(error));
    }
  }

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

  //send-messages via hub signalR---
  async sendMessages(username: string, content: string) {
    return this.hubConnection?.invoke('SendMessage', {
      recipientName: username, // Changed from recipientUsername
      content,
    });
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
