import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Member } from '../../../models/member';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  //here ! means it is not null
  @Input() userData!: Member;
}
