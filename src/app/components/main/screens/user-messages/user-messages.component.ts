import {
  Component,
  inject,
  input,
  OnInit,
  output,
  ViewChild,
  viewChild,
} from '@angular/core';
import { Message } from '../../../../models/message';
import { MessageService } from '../../../../_services/message.service';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule } from '@angular/forms';
import { Input } from 'postcss';

@Component({
  selector: 'app-user-messages',
  standalone: true,
  imports: [TimeagoModule, FormsModule],
  templateUrl: './user-messages.component.html',
  styleUrl: './user-messages.component.css',
})
export class UserMessagesComponent {
  messageService = inject(MessageService);

  @ViewChild('messageForm') messageForm: any;
  username = input.required<string>();
  messages = input.required<Message[]>();
  messageContent: any;
  loading: any;
  updateMessages = output<Message>();

  sendMessage() {
    this.messageService
      .sendMessages(this.username(), this.messageContent)
      .subscribe({
        next: (requestResponse) => {
          this.updateMessages.emit(requestResponse);
          this.messageForm?.reset();
          // this.messageContent = '';
        },
      });
  }
}
