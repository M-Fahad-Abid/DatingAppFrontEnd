import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../../models/user';
import { AccountService } from '../../../../services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  data?: User;

  private service = inject(AccountService);
}
