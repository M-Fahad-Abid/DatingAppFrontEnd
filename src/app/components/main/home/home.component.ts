import { Component, inject } from '@angular/core';

import { AccountService } from '../../../_services/account.service';
import { Router } from '@angular/router';
import { UsersComponent } from "../screens/users/users.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  registerToggle: boolean = false;

  messageFromParentComp = 'This is the message from parent component';

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
