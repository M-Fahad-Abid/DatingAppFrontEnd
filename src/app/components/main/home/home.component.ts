import { Component, inject } from '@angular/core';

import { AccountService } from '../../../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  registerToggle: boolean = false;

  public accountService = inject(AccountService);
  private router = inject(Router);

  registerToggleMethod() {
    this.registerToggle = !this.registerToggle;
  }

  registerBtn() {
    this.router.navigateByUrl('/user-register');
  }
  infoBtn() {
    this.router.navigateByUrl('/learn-more');
  }
}
