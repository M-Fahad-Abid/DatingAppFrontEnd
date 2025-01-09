import { CanDeactivateFn } from '@angular/router';
import { EditUserComponent } from '../components/main/screens/edit-user/edit-user.component';
import { inject } from '@angular/core';
import { ConfirmService } from '../_services/confirm.service';

export const preventUnsavedChangesGuard: CanDeactivateFn<EditUserComponent> = (
  component
) => {
  const confirmService = inject(ConfirmService);

  if (component.editForm?.dirty) {
    return confirmService.confirm() ?? false;
  }
  return true;
};
