import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  busyRequestCount = 0;
  private spinner = inject(NgxSpinnerService);

  busy() {
    this.busyRequestCount++;
    this.spinner.show(undefined, {
      bdColor: 'rgba(0, 0, 0, 0.8)',
      size: 'large',
      color: '#fffff',
      type: 'ball-atom',
    });
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinner.hide();
    }
  }
}
