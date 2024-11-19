import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  model: any = {};

  title: string = 'DateApp';

  responseMessage: any;

  public service = inject(AccountService);
  private toastr = inject(ToastrService);

  constructor(private elementRef: ElementRef) {}

  login() {
    this.service.login(this.model).subscribe({
      next: (response) => {
        this.responseMessage = response;
        this.toastr.success('Hello', 'Login Success');
      },
      error: (err) => this.toastr.error(err, 'Ops Something Wend wrong'),
    });
  }

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isMenuOpen = false;
    }
  }

  signOut() {
    this.service.logout();
  }
}
