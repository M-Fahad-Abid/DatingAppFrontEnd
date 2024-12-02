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
  private memberService = inject(MembersService);
  data: Member[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.memberService.getAllUsers().subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }
}