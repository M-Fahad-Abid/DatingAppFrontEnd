import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../../_services/members.service';
import { Member } from '../../../../models/member';
import { CardComponent } from '../../../other/card/card.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  public memberService = inject(MembersService);
  // data: Member[] = [];
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) this.getUsers();
  }

  getUsers() {
    this.memberService.getAllUsers(this.pageNumber, this.pageSize);
  }
}
