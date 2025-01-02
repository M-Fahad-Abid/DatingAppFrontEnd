import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../../models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { UserMessagesComponent } from '../user-messages/user-messages.component';
import { Message } from '../../../../models/message';
import { MessageService } from '../../../../_services/message.service';
import { PresenceService } from '../../../../_services/presence.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    TabsModule,
    GalleryModule,
    TimeagoModule,
    DatePipe,
    UserMessagesComponent,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  presenceService = inject(PresenceService);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  images: GalleryItem[] = [];

  //   whats this?
  member: Member = {} as Member;
  activeTab?: TabDirective;
  messages: Message[] = [];

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.member = data['user'];
        this.member &&
          this.member.photos.map((p) => {
            this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
          });
      },
    });

    this.route.queryParams.subscribe({
      next: (params) => {
        if (params['tab'] && this.selectTab) {
          this.selectTab(params['tab'] as string);
        }
      },
    });
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (
      this.activeTab.heading === 'Messages' &&
      this.messages.length === 0 &&
      this.member
    ) {
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: (response) => {
          this.messages = response;
        },
      });
    }
  }

  //   loadMember() {
  //     const username = this.route.snapshot.paramMap.get('username');
  //     if (!username) {
  //       return;
  //     }
  //     this.memberService.getuserByName(username).subscribe({
  //       next: (response) => {
  //         this.member = response;
  //         response.photos.map((p) => {
  //           this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
  //         });
  //       },
  //     });
  //   }

  onUpdateMessages(event: Message) {
    this.messages.push(event);
  }

  selectTab(heading: string) {
    if (this.memberTabs) {
      const messageTab = this.memberTabs.tabs.find(
        (x) => x.heading === heading
      );
      if (messageTab) {
        messageTab.active = true;
      }
    }
  }
}
