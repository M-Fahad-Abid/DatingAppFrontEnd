import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { HasRoleDirective } from '../../../_directives/has-role.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HasRoleDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  public accountService = inject(AccountService);
  private toastr = inject(ToastrService);

  model: any = {};

  username?: string;

  title: string = 'DateApp';

  responseMessage: any;

  ngOnInit(): void {
    this.username = this.accountService.getUserData();
    console.log('Is there username', this.username);
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        this.responseMessage = response;
        this.toastr.success('Hello', 'Login Success');
      },
      error: (err) => this.toastr.error(err, 'Ops Something Wend wrong'),
    });
  }

  logout() {
    this.accountService.logout();
  }
}
