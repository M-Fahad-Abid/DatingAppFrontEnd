import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../../_services/admin.service';
import { User } from '../../../../models/user';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../../shared/modals/roles-modal/roles-modal.component';
import { AdminData } from '../../../../models/admin-data';
import { ResponseUser } from '../../../../models/response-user';

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
      next: (response: ResponseUser[]) => {
        this.users = response.map((user) => ({
          userName: user.username,
          roles: user.roles,
          token: '',
          gender: '',
          photoUrl: user.photoUrl || '',
        }));
        console.log('le response from request', this.users);
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
        username: user.userName,
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
            .updateUserRoles(user.userName, selectedRoles)
            .subscribe({
              next: (roles) => (user.roles = roles),
            });
        }
      },
    });
  }
}
