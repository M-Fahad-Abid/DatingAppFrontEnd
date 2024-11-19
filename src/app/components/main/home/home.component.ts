import { Component, inject } from '@angular/core';

import { AccountService } from '../../../_services/account.service';
import { Router, RouterLink } from '@angular/router';
import { MainComponent } from '../screens/main/main.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MainComponent],
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
