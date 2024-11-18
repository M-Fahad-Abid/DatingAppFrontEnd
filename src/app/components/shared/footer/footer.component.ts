import { Component, inject } from '@angular/core';
import { AccountService } from '../../../_services/account.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  public service = inject(AccountService);
}
