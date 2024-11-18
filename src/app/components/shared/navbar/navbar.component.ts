import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  model: any = {};

  title: string = 'DateApp';

  responseMessage: any;

  @Output() cancelToggle = new EventEmitter();

  public service = inject(AccountService);
  private toastr = inject(ToastrService);

  login() {
    this.service.login(this.model).subscribe({
      next: (response) => {
        this.responseMessage = response;
        this.toastr.success('Hello', 'Login Success');
      },
      error: (err) => this.toastr.error(err, 'Ops Something Wend wrong'),
    });
  }

  logout() {
    this.service.logout();
  }
}
