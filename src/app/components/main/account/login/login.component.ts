import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  model: any = {};

  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);

        this.toastr.success('Login success', 'Yo hoo');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.router.navigateByUrl('/main');
      },
    });
  }
}
