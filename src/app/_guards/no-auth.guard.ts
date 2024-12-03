import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  const isAuthenticated = accountService.signal();
  if (isAuthenticated) {
    router.navigateByUrl('/user');
    return false;
  }
  return true;
};
