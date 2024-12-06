import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member } from '../../../models/member';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../../_services/account.service';
import { environment } from '../../../../environments/environment.development';
import { MembersService } from '../../../_services/members.service';
import { Photo } from '../../../models/photo';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [CommonModule, NgClass, NgStyle, FileUploadModule],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css',
})
export class PhotoEditorComponent implements OnInit {
  members = input.required<Member>();
  memberChange = output<Member>();

  uploader?: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment;

  private accountService = inject(AccountService);
  private userService = inject(MembersService);

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(event: any) {
    this.hasBaseDropZoneOver = event;
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(photo).subscribe({
      next: () => {
        const user = this.accountService.signal();
        if (user) {
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user);
        }
        const updateMember = { ...this.members() };
        updateMember.photosUrl = photo.url;
        updateMember.photos.forEach((p) => {
          if (p.isMain) p.isMain = false;
          if (p.id === photo.id) p.isMain = true;
        });
        this.memberChange.emit(updateMember);
      },
      error: (err) => console.log(err),
      complete: () => {},
    });
  }

  deletePhoto(photo: Photo) {
    this.userService.deletePhoto(photo).subscribe({
      next: (_) => {
        const updateUser = { ...this.members() };
        updateUser.photos = updateUser.photos.filter((x) => x.id !== photo.id);
        this.memberChange.emit(updateUser);
      },
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl.urlHttps + 'user/add-photo',
      authToken: 'Bearer ' + this.accountService.signal()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo = JSON.parse(response);
      const updateMember = { ...this.members() };
      updateMember.photos.push(photo);
      this.memberChange.emit(updateMember);
    };
  }
}
