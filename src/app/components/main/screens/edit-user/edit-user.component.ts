import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Member } from '../../../../models/member';
import { AccountService } from '../../../../_services/account.service';
import { MembersService } from '../../../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from '../../photo-editor/photo-editor.component';
import { DatePipe } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    TabsModule,
    FormsModule,
    PhotoEditorComponent,
    DatePipe,
    TimeagoModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;

  //Browser Event
  @HostListener('window:beforeunload', ['$event']) notifyUser($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  user?: Member;

  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    console.log('loading of parent edit component');

    this.loadUserDetails();
  }

  loadUserDetails() {
    const user = this.accountService.signal();

    if (!user) return;
    this.memberService.getuserByName(user.userName).subscribe({
      next: (response) => {
        this.user = response;
      },
    });
  }

  updateUser() {
    console.log('Updated Data from form', this.user);
    // this.editForm?.reset(this.user);

    this.memberService.updateUserInfo(this.editForm?.value).subscribe({
      next: () => {
        this.toastr.success('Profile Updated successfully', 'Updated');
        this.editForm?.reset(this.user);
      },
      error: (err) => console.log(err),
    });
  }

  onMemberChange(event: Member) {
    this.user = event;
  }
}
