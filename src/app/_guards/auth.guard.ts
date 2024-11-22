import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const toast = inject(ToastrService);

  const isAuthenticated = accountService.signal();

  if (isAuthenticated) {
    return true;
  } else {
    toast.error('You need to log in to access this page.');
    router.navigate(['/']);
    return false;
  }
};
