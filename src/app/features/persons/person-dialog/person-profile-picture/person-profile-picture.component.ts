import { PersonDto } from '@arpa/models';
import { Component, Input, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { NotificationsService } from '@arpa/services';

@Component({
  selector: 'arpa-person-profile-picture',
  templateUrl: './person-profile-picture.component.html',
  styleUrls: ['./person-profile-picture.component.scss'],
})
export class PersonProfilePictureComponent implements OnInit {
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
    this.notificationsService.success('PERSON_MODIFIED', 'persons');
    this.reloadProfilePicture();
  }

  onUploadError() {
    this.notificationsService.error('USER_PROFILE_UPDATE_ERROR', 'persons', false);
    this.reloadProfilePicture();
  }

  onRemove() {
    this.personService.deleteProfilePicture(this.person.id).subscribe(
      (succ) => {
        this.onUploadSuccess();
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
