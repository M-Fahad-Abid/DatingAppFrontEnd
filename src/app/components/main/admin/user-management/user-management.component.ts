import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../../_services/admin.service';
import { User } from '../../../../models/user';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../../shared/modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  private adminService = inject(AdminService);
  private modalService = inject(BsModalService);
  users: User[] = [];
  bsModalRef: BsModalRef<RolesModalComponent> =
    new BsModalRef<RolesModalComponent>();

  ngOnInit(): void {
    this.getUserWithRoles();
    // console.log('this is admin panel', this.users);
  }

  trackById(index: number, item: any): any {
    return item.id;
  }

  getUserWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: (response) => {
        this.users = response;
        // console.log('le response from request', this.users);
      },
      error: (err) => console.log('checking for errors', err),
    });
  }

  onRolesModal(user: User) {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: 'Edit Roles',
        availableRoles: ['Admin', 'Moderator', 'Member'],
        username: user.username,
        selectedRoles: [...user.roles],
        user: this.users,
        rolesUpdated: false,
      },
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, initialState);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        if (this.bsModalRef.content && this.bsModalRef.content.rolesUpdated) {
          const selectedRoles = this.bsModalRef.content.selectedRoles;
          this.adminService
            .updateUserRoles(user.username, selectedRoles)
            .subscribe({
              next: (roles) => (user.roles = roles),
            });
        }
      },
    });
  }
}
