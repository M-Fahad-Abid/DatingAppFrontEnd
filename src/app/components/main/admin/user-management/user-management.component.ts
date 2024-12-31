import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../../_services/admin.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  private adminService = inject(AdminService);
  users: User[] = [];

  ngOnInit(): void {
    this.getUserWithRoles();
  }

  getUserWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: (response) => {
        this.users = response;
      },
    });
  }
}
