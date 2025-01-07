import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../../../models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { UserMessagesComponent } from '../user-messages/user-messages.component';
import { Message } from '../../../../models/message';
import { MessageService } from '../../../../_services/message.service';
import { PresenceService } from '../../../../_services/presence.service';
import { AccountService } from '../../../../_services/account.service';
import { HubConnectionState } from '@microsoft/signalr';

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
export class UserDetailComponent implements OnInit, OnDestroy {
  presenceService = inject(PresenceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private accountService = inject(AccountService);

  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  images: GalleryItem[] = [];

  //   whats this?
  member: Member = {} as Member;
  activeTab?: TabDirective;

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

    this.route.paramMap.subscribe({
      next: (_) => this.onRouteParamsChange(),
    });

    this.route.queryParams.subscribe({
      next: (params) => {
        if (params['tab'] && this.selectTab) {
          this.selectTab(params['tab'] as string);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  onRouteParamsChange() {
    const user = this.accountService.signal();
    if (!user) return;
    if (
      this.messageService.hubConnection?.state ===
        HubConnectionState.Connected &&
      this.activeTab?.heading === 'Messages'
    ) {
      this.messageService.hubConnection.stop().then(() => {
        this.messageService.createHubConnection(user, this.member.userName);
      });
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: this.activeTab.heading },
      queryParamsHandling: 'merge',
    });
    console.log('Tab activated data from user detail comp:', this.activeTab);
    if (this.activeTab.heading === 'Messages' && this.member) {
      const user = this.accountService.signal();
      console.log('User signal data from user detail comp:', user);
      if (!user) return;
      this.messageService.createHubConnection(user, this.member.userName);
    } else {
      console.log('Stopping hub connection');
      this.messageService.stopHubConnection();
    }
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
