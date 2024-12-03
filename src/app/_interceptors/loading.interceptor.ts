import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from '../_services/spinner/spinner.service';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  spinnerService.busy();

  return next(req).pipe(
    delay(1000),
    finalize(() => {
      spinnerService.idle();
    })
  );
};
