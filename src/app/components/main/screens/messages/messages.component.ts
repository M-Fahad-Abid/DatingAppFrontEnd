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
  getRoute(_t25: Message) {
    throw new Error('Method not implemented.');
  }
  deleteMessage(arg0: number) {
    throw new Error('Method not implemented.');
  }
  messageService = inject(MessageService);
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  isOutbox: any;
  ngOnInit(): void {
    this.loadMessages();
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
