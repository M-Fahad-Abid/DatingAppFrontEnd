import { Component, inject, OnInit } from '@angular/core';
import { LikesService } from '../../../../_services/likes.service';
import { Member } from '../../../../models/member';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CardComponent } from '../../../other/card/card.component';
import { MembersService } from '../../../../_services/members.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-likes-list',
  standalone: true,
  imports: [FormsModule, ButtonsModule, CardComponent, PaginationModule],
  templateUrl: './likes-list.component.html',
  styleUrl: './likes-list.component.css',
})
export class LikesListComponent implements OnInit {
  public likeService = inject(LikesService);
  // public memberService = inject(MembersService)
  
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    console.log("like comp loaded");
    
    this.loadLikes();
  }

  getTitle() {
    switch (this.predicate) {
      case 'liked':
        return 'Members you like';
      case 'likedBy':
        return 'Members who like you';
      default:
        return 'Mutual';
    }
  }

  loadLikes() {
    this.likeService.getLikesDetails(
      this.predicate,
      this.pageNumber,
      this.pageSize
    );
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }
}
