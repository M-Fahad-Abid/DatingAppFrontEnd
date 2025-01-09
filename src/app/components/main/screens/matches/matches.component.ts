import { Component, inject, OnInit } from '@angular/core';
import { LikesService } from '../../../../_services/likes.service';
import { User } from '../../../../models/user';
import { Member } from '../../../../models/member';
import { CardComponent } from '../../../other/card/card.component';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css',
})
export class MatchesComponent implements OnInit {
  private likeService = inject(LikesService);
  userMatches: Member[] = [];

  ngOnInit(): void {
    console.log('matches comp');
    this.fetchMatches();
  }

  fetchMatches() {
    this.likeService.getMatches().subscribe({
      next: (response) => {
        this.userMatches = response;
        console.log('Api Data of matches', this.userMatches);
      },
    });
  }
}
