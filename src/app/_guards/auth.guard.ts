import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const toast = inject(ToastrService);

  if (accountService.signal()) {
    return true;
  } else {
    // router.navigateByUrl('/unavailable');
    toast.warning('Access Denied', 'Login First');
    return false;
  }
};
