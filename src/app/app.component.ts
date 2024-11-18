import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AccountService } from './_services/account.service';
import { FooterComponent } from "./components/shared/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'DatingAppFrontEnd';

  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.geUserCredentials();
  }

  geUserCredentials() {
    const userToken = localStorage.getItem('userCreds');
    if (!userToken) {
      return;
    }
    const user = JSON.parse(userToken);
    this.accountService.signal.set(user);
  }
}
