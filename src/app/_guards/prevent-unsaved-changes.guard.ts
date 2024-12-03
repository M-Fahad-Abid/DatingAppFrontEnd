import { CanDeactivateFn } from '@angular/router';
import { EditUserComponent } from '../components/main/screens/edit-user/edit-user.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<EditUserComponent> = (
  component
) => {
  if (component.editForm?.dirty) {
    return confirm(
      'Are you sure you want to continue, Any UnSaved Changes Would be lost! '
    );
  }
  return true;
};
