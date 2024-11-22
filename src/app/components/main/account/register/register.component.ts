import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  model: any = {};

  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        this.toastr.success('Registered', 'Registration Successful');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.router.navigateByUrl('/');
      },
    });
  }
  cancel() {
    console.log('cancel clicked');
    this.router.navigateByUrl('/');
  }
}
