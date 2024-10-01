import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AccountService } from '../../../../services/account.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Login } from '../../../../models/account/login';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  data: Login = { userName: '', password: '' };

  private service = inject(AccountService);

  login(form: NgForm) {
    console.log('form Data', form);
    this.service.login(this.data).subscribe({
      next: (response) => {
        console.log('response is:', response);
      },
      error: (error) => {
        console.log('error is:', error);
      },
    });
  }
}
