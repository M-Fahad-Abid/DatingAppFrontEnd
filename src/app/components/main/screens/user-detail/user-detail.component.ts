import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../../models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule, TimeagoModule, DatePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);

  images: GalleryItem[] = [];
  member?: Member;

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) {
      return;
    }
    this.memberService.getuserByName(username).subscribe({
      next: (response) => {
        this.member = response;
        response.photos.map((p) => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
        });
      },
    });
  }
}
