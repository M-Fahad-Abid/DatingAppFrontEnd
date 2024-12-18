import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../../_services/members.service';
import { CardComponent } from '../../../other/card/card.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccountService } from '../../../../_services/account.service';
import { UserParams } from '../../../../models/user-params';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CardComponent, PaginationModule, FormsModule, ButtonsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  memberService = inject(MembersService);

  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  ngOnInit(): void {
    if (!this.memberService.paginatedResult()) this.getUsers();
  }

  getUsers() {
    this.memberService.getAllUsers();
  }

  resetFilters() {
    this.memberService.resetUserParams();
    this.getUsers();
  }

  pageChanged(event: any) {
    if (this.memberService.userParams().pageNumber !== event.page) {
      this.memberService.userParams().pageNumber = event.page;
      this.getUsers();
    }
  }
}
