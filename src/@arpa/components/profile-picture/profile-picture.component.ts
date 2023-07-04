import { PersonDto } from '@arpa/models';
import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService, PersonService } from '@arpa/services';

@Component({
  selector: 'arpa-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent implements OnInit {
  private fallbackUrl = 'assets/common/images/avatar.png';

  @Input() person: PersonDto;
  imageUrl = '';
  uploadUrl = '';
  hasPicture = false;

  constructor(private personService: PersonService, private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.uploadUrl = this.personService.getProfilePictureUrl(this.person.id);
    this.reloadProfilePicture();
  }

  getUrl() {
    return this.personService.getProfilePictureUrl(this.person.id);
  }

  onUploadSuccess() {
    this.notificationsService.success('PROFILE_PICTURE_CHANGED', 'profile');
    this.reloadProfilePicture();
  }
  onDeletionSuccess() {
    this.notificationsService.success('PROFILE_PICTURE_REMOVED', 'profile');
    this.reloadProfilePicture();
  }

  onUploadError() {
    this.notificationsService.error('PROFILE_PICTURE_UPLOAD_ERROR', 'profile', false);
    this.reloadProfilePicture();
  }

  onRemove() {
    this.personService.deleteProfilePicture(this.person.id).subscribe(
      (succ) => {
        this.onDeletionSuccess();
      },
      () => {
        this.onUploadError();
      }
    );
  }

  private reloadProfilePicture() {
    this.personService.getProfilePicture(this.person.id, 300).subscribe(
      (data) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const fileBase64 = e.target.result;
          this.setUrl(data.type, fileBase64);
          this.hasPicture = true;
        };
        reader.readAsBinaryString(data);
      },
      (error) => {
        this.imageUrl = this.fallbackUrl;
        this.hasPicture = false;
      }
    );
  }

  private setUrl(dataType: string, fileBase64: string): void {
    this.imageUrl = `data:${dataType};base64,${btoa(fileBase64)}`;
  }
}
