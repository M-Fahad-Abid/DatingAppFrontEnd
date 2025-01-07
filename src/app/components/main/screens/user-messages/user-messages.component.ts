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
export class UserMessagesComponent implements OnInit {
  messageService = inject(MessageService);

  @ViewChild('messageForm') messageForm: any;
  username = input.required<string>();

  messageContent: any;
  loading: any;

  ngOnInit(): void {
    console.log('checking that user-message component is loaded ');
  }

  sendMessage() {
    if (!this.messageContent) return;

    this.loading = true;
    this.messageService
      .sendMessages(this.username(), this.messageContent)
      .then(() => {
        this.messageForm.reset();
      })
      .catch((error) => console.error('Send message error:', error))
      .finally(() => (this.loading = false));
  }
}
