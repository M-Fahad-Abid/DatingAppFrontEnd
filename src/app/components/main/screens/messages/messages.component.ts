import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../../../../_services/message.service';

import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';
import { RouterLink } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Message } from '../../../../models/message';
@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    FormsModule,
    ButtonsModule,
    TimeagoModule,
    RouterLink,
    PaginationModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  messageService = inject(MessageService);
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  isOutbox: any;

  ngOnInit(): void {
    this.loadMessages();
  }

  getRoute(message: Message) {
    if (this.container === 'Outbox') {
      return `/user/${message.recipientUsername}`;
    } else return `/user/${message.senderName}`;
  }

  deleteMessage(msgId: number) {
    this.messageService.deleteMessage(msgId).subscribe({
      next: () => {
        this.messageService.paginatedResult.update((prev) => {
          if (prev && prev.items) {
            prev.items.splice(
              prev.items.findIndex((m) => m.id !== msgId),
              1
            );
            return prev;
          }
          return prev;
        });
      },
    });
  }

  loadMessages() {
    this.messageService.getMessages(
      this.pageNumber,
      this.pageSize,
      this.container
    );
  }

  pageChange(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }
}
