import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AccountService } from '../../../../_services/account.service';
import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  @Input() parentData: any;

  public accountService = inject(AccountService);
  private http = inject(HttpClient);

  value: any[] = [];
  //This piece of code prevent's to go back
  // constructor(private platformLocation: PlatformLocation) {
  //   history.pushState(null, '', location.href);
  //   this.platformLocation.onPopState(() => {
  //     history.pushState(null, '', location.href);
  //   });
  // }

  ngOnInit(): void {
    this.getAllUsers();
  }



  getAllUsers() {
    this.http
      .get<any[]>('https://localhost:7057/api/user/get-all-users')
      .subscribe({
        next: (response) => {
          this.value = response;
          console.log(this.value);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
